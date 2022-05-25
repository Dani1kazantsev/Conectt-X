class files{
    Extension = '';
    Content = '';
    constructor(content,extension) {
        this.Content = content;
        this.Extension = extension;
    }
}
document.querySelector('#codemirror').addEventListener('click',()=>{
    printIde()
})
function printIde(){
    let html = '<div class="messenger-main__header">' +
        '<div class="messenger-main__file-name">index.html</div>'
    html += '<div class="messenger-main__container">'
    html += '<button class="messenger-main__start-button">start</button>' +
        '<button class="messenger-main__other"></button>'
    html += '</div></div><textarea id="code" class="codemirror"></textarea>'
    html += '<div class="messenger-main__html"></div>'
    document.querySelector('.messenger-main').innerHTML = html;
    document.querySelector('.messenger-main__header').style.background = '#202627'
    document.querySelector('.messenger-user').classList = 'messenger-files'

    html = '<div class="messenger-files__header"><div class="messenger-files__title">' +
        'Files</div><div class="messenger-files__nav">' +
        '<img src="img/manifest/icons/files.svg" alt="" class="messenger-files__img">' +
        '<img src="img/manifest/icons/folder.svg" alt="" class="messenger-files__img">' +
        '<img src="img/manifest/icons/unloading.svg" alt="" class="messenger-files__img">' +
        '</div></div>'
    html += '<div class="messenger-files__files">' +
        '<ul class="messenger-files__list">' +
        `<li id="index.html" class="messenger-files__list-item active"><img src="img/manifest/icons/file.svg" alt=""> index.html</li>
        <li id="script.js" class="messenger-files__list-item"><img src="img/manifest/icons/file.svg" alt=""> script.js</li></ul></div>`
    document.querySelector('.messenger-files').innerHTML = html;
    document.querySelector('.messenger-main__start-button').addEventListener('click',()=>{
        html = `<iframe class=""></iframe>`
        document.querySelector('.messenger-main__html').innerHTML = html;
        document.querySelector('iframe').setAttribute('srcdoc',editor.getValue())
    })
}
printIde()
let keys = []
window.addEventListener('keydown',(e)=>{
    if (keys.indexOf(e.keyCode) == -1){
        keys.push(e.keyCode)
    }

})
window.addEventListener('keyup',(e)=>{
    keys.splice(keys.indexOf(e.keyCode),1)
    
})
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode : "text/html",
    theme:'material-ocean',
    lineNumbers:true,
    extraKeys: {
        'Tab': 'emmetExpandAbbreviation',
        'Esc': 'emmetResetAbbreviation',
        'Enter': 'emmetInsertLineBreak',
        'Ctrl-Space':'emmetCaptureAbbreviation'
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
});
