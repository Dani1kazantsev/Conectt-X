let boolean = true
let editor;
let lastFile;

function printIde(server) {
    document.querySelector('.messenger-nav-2__friends').innerHTML = ''
    document.querySelector('.messenger-nav-2__channels-list').innerHTML = ''
    server.channels.forEach(channel=>{
        let li = document.createElement('li')
        li.classList.add('messenger-nav-2__channel')
        li.classList.add(`messenger-nav-2__channel-${channel.type}`)
        let a = document.createElement('a')
        a.href = '#'
        a.innerText = `#${channel.name}`
        a.addEventListener('click',()=>{
            printChannel(channel)
        })
        li.appendChild(a)
        document.querySelector('.messenger-nav-2__channels-list').appendChild(li)
    })
    let html = '<div class="messenger-main__header">' +
        '<div class="messenger-main__file-name">index.html</div>'
    html += '<div class="messenger-main__container">'
    html += '<button class="messenger-main__start-button">START</button>' +
        '<button class="messenger-main__other"></button>'
    html += '</div></div><textarea id="code" class="codemirror"></textarea>'
    html += '<div class="messenger-main__html"></div>'
    document.querySelector('.messenger-main').innerHTML = html;
    document.querySelector('.messenger-main__header').style.background = '#202627'
    document.querySelector('.messenger-user').classList = 'messenger-files'
    html = '<div class="messenger-files__header"><div class="messenger-files__title">' +
        'Files</div><div class="messenger-files__nav">' +
        '<img src="src/img/manifest/icons/files-add.svg" alt="" class="messenger-files__img messenger-files_create-file">' +
        '<img src="src/img/manifest/icons/folder-add.svg" alt="" class="messenger-files__img messenger-files_create-directory">' +
        '<img src="src/img/manifest/icons/unloading.svg" alt="" class="messenger-files__img messenger-files_upload-file">' +
        '</div></div>'
    html += '<div class="messenger-files__files">' +
        `<ul class="messenger-files__list"></ul></div>`
    document.querySelector('.messenger-files').innerHTML = html;
    document.querySelector('.messenger-main__start-button').addEventListener('click', () => {
        startFile(lastFile)
    })
    editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            mode: "text/html",
            theme: 'material-ocean',
            lineNumbers: true,
            extraKeys: {
                'Tab': 'emmetExpandAbbreviation',
                'Esc': 'emmetResetAbbreviation',
                'Enter': 'emmetInsertLineBreak',
                'Ctrl-Space': 'emmetCaptureAbbreviation'
            },
            emmet: {
                mark: true,
                markTagPairs: true,
                previewOpenTag: true,
                config: {
                    // Specify snippets for all markup syntaxes: HTML, XML, Pug etc.
                    markup: {
                        // Shorthand for larger abbreviation
                        foo: 'div.foo>section.bar*3',

                        // Define shape of element, looks like recursive abbreviation
                        a: 'a[href title]',
                        br: 'br/'
                    },

                    // Specify snippets for specific syntax only
                    html: {
                        nav: 'ul.nav>.nav-item*4>a'
                    }
                }
            }
        }
    );
    if(server.channels.length > 0){
        printChannel(server.channels[0])
    }
    let keys = []
    window.addEventListener('keydown',e=>{
        if(e.which === 17){
            keys.push(e.which)
        }
        if(e.which == 83&&keys.indexOf(17) !== -1){
            e.preventDefault()
            myAxios.put(`/channels/updateFile`, {...lastFile,data:editor.getValue()})
        }
    })
    window.addEventListener('keyup',e=>{
        keys.splice(keys.indexOf(e.which),1)
    })
}
async function startFile(file){
    let iframe = document.createElement('iframe')
    iframe.classList.add('code-frame')
    let x = 0
    let i = 0;
    let html = editor.getValue()
    while(x !== -1){
        x = html.indexOf('src',i)
        if(x !== -1){
            let startOfSrc = editor.getValue().indexOf('"',x)
            let endOfSrc = editor.getValue().indexOf('"',startOfSrc + 1)
            const path = `${lastFile.directory.path}/${editor.getValue().substring(startOfSrc + 1,endOfSrc)}`
            const substr = new RegExp(`${editor.getValue().substring(startOfSrc + 1,endOfSrc)}`)
            html = html.replace(substr,`${API_URL}/channels/getFileDataByPath/${path.split('/')}`)
        }
        i = x + 1
    }
    iframe.setAttribute('srcdoc',html)
    iframe.addEventListener('load',()=>{
        let links = document.querySelector('.code-frame').contentDocument.querySelectorAll('link')
        links.forEach(async link=>{
            if(link.attributes.rel !== undefined){
                if(link.attributes.rel.value === 'stylesheet'){
                    let style = document.querySelector('.code-frame').contentDocument.createElement('style')
                    let path = `${lastFile.directory.path}/${link.attributes.href.value}`
                    let file = await myAxios.get(`${API_URL}/channels/getFileDataByPath/${path.split('/')}`)
                    style.textContent = file.data
                    document.querySelector('.code-frame').contentDocument.head.appendChild(style)
                }
            }
        })
    })
    document.querySelector('.messenger-main__html').appendChild(iframe)

}
function printChannel(channel){
    localStorage.setItem('directory',`/${channel.name}`)
    document.querySelector('.messenger-files_create-file').addEventListener('click',()=>{
        let promptAnswer = prompt('Введите название и расширение файла. Пример: script.js')
        let fileName = promptAnswer.split('.')[0]
        let fileExt = promptAnswer.split('.')[1]
        channel.directories.find(directory=>{if(directory.path.indexOf(localStorage.directory,0))return true})
        myAxios.post('/channels/createFile',{
            channelId:channel.id,
            name:fileName,
            ext:fileExt,
            path:localStorage.directory
        }).then(response=>{
            createFileHTML(response.data)
            me.servers.find(server=>server.id === channel.server.id).channels.find(myChannel => myChannel.id === channel.id).directories.find(directory=>{if(directory.path.indexOf(localStorage.directory,0))return true}).files.push(response.data)
        })
    })
    if(channel.directories.length === 1){
        document.querySelector('.messenger-main__file-name').innerText = 'File'
        document.querySelector('.messenger-files__list').innerHTML = ''
    }
    channel.directories.forEach(directory=>{
        if(directory.name === channel.name){
            directory.files.forEach(file=>{
                createFileHTML(file)
            })
            if(directory.files.length > 0){
                printFile(directory.files[0])
            }
        }
    })
}
function createFileHTML(file){
    let li = document.createElement('li')
    li.classList.add(`messenger-files__list-item`)
    let img = document.createElement('img')
    img.src = 'src/img/manifest/icons/file.svg'
    li.appendChild(img)
    li.insertAdjacentHTML('beforeend',`${file.name}.${file.ext}`)
    li.addEventListener('click',()=>{
        printFile(file)
    })
    document.querySelector('.messenger-files__list').appendChild(li)
}
async function printFile(file){
    myAxios.put(`/channels/updateFile`, {...lastFile,data:editor.getValue()})
    lastFile = file
    let data = await myAxios.get(`channels/getFileData${file.id}`)
    editor.getDoc().setValue(data.data);
    document.querySelector('.messenger-main__file-name').innerText = `${file.name}.${file.ext}`
}