const socket = io(API_URL);
let me;
let lastMessage;
let booleanInfo = true;
let formData;
let checkSecond = true
if (localStorage.token) {
    if (jwt_decode(localStorage.token).exp * 1000 < Date.now()) {
        location.href = 'login.html'
    }
} else {
    location.href = 'login.html'
}
myAxios.get(`users/me${JSON.parse(localStorage.getItem('me')).id}`).then(async (res) => {
    me = res.data
    me.lastOpenedChat = Number(me.lastOpenedChat)
    socket.on('connect', function () {
        if (me.chat !== null) {
            myAxios.put('/users/updateSocket', {socketId: socket.id}
            )
        } else {
            myAxios.post('/users/socket', {socketId: socket.id, customId: me.id}
            )
        }
    });
    socket.on('disconnect', function () {

    });
    socket.on('message', function (message) {
        if (lastMessage == undefined && message.fromServer && message.fromUserId == me.lastOpenedChat) {
            let data = new Date(Date.parse(message.data));
            let minutes;
            if (data.getMinutes() < 10) {
                minutes = "0" + data.getMinutes()
            } else {
                minutes = data.getMinutes()
            }
            document.querySelector('.messenger-main__chat-list')
                .insertAdjacentHTML('beforeend',
                    `<div class='message-from'><p>${message.text}</p>
                    <span class='message__time--from'> 
                     ${data.getHours()}:${minutes} </span></div>`);
            lastMessage = message;
            document.querySelector('.messenger-main__chat').scrollBy(0, document.querySelector('.messenger-main__chat').scrollHeight)
        } else if (message.fromServer && message.fromUserId == me.lastOpenedChat) {
            lastMessage = undefined
        } else if (message.fromServer && lastMessage == undefined) {
            printNotification(message)
            lastMessage = message
            me.friends.find(friend => friend.id == message.fromUserId).messages.push(message)
        } else {
            lastMessage = undefined
        }

    })
    socket.on('friendAdd', async function (e) {
        if (e.fromServer) {
            if(checkSecond){
                checkSecond = !checkSecond
                let newMe = await myAxios.get(`users/me${me.id}`)
                me.friends = newMe.data.friends
                await printFriend()
            }else {
                checkSecond = !checkSecond
            }
        }

    })
    printServers()
    printAccountInfo(me);
    await printFriend()
    if (me.lastOpenedChat !== -1) {
        for (let friend of me.friends) {
            if (friend.id == me.lastOpenedChat) {
                printChat(friend)
            }
        }
    } else {
        printChat(me.lastOpenedChat)
    }
    for (let friend of me.friends) {
        let count = 0;
        for (let i = friend.messages.length - 1; i >= 0; i--) {
            if (friend.messages[i].readed == false) {
                count += 1
            } else {
                if (count === 0) {
                    count = ''
                }
                document.querySelector('.message-number' + friend.id).textContent = count
                if (count == 1) {
                    document.querySelector('.messenger-main__notification-list').insertAdjacentHTML('beforeend',
                        `<li class="${friend.id}" id="${friend.id}">Одно новое сообщение от ${friend.login}</li>`)
                    document.querySelector('.messenger-main__notification').classList.add('messenger-main__notification--active')
                } else if (count !== '') {
                    document.querySelector('.messenger-main__notification-list').insertAdjacentHTML('beforeend',
                        `<li class="${friend.id}" id="${friend.id}">${count} новых сообщений от ${friend.login}</li>`)
                    document.querySelector('.messenger-main__notification').classList.add('messenger-main__notification--active')
                }
                break
            }
        }
    }
})

async function printAccountInfo(obj) {
    if (booleanInfo) {
        let avatar;
        if (me.avatar !== 'user.png') {
            avatar = await myAxios.get('users/avatar' + me.id)
            avatar = avatar.data
        } else {
            avatar = 'src/img/manifest/messenger/' + me.avatar
        }
        if (me.status == null) {
            me.status = ''
        }
        if (document.querySelector('.messenger-files')) {
            document.querySelector('.messenger-files').classList = 'messenger-user'
        }
        let html = `<div class="messenger-user__photo">
    </div><div class="messenger-user__info">
        <div class="messenger-user__person">
            <div class="messenger-user__person--edit">
                <span class="messenger-user__status">Status</span>
                <button type="button" class="messenger-user__edit"></button>
            </div>
            <div class="status-block" contenteditable="true">${me.status}</div>
        </div>
        <ul class="messenger-user__networks ulres">
            <li class="messenger-user__link"><a href="#"></a></li>
            <li class="messenger-user__link messenger-user__link--git"><a href="#"></a></li>
        </ul>
        <div class="messenger-user__username-block">
         <span class='messenger-user__username'>Логин</span>
                ${me.login}
        </div>
        <div class="messenger-user__username-block messenger-user__username-block-email">
            <span class="messenger-user__username">Email</span>
        </div>
        <div class="messenger-user__btn--cont">

        </div>

    </div>`

        document.querySelector('.messenger-user').innerHTML = html;
        document.querySelector('.messenger-user__photo').innerHTML =
            `<div id="UserPhoto" class="messenger-user__photo--container">` +
            `<img src="${avatar}" alt="user" class="user__photo-img">` +
            `<label class="messenger-user__btn image-upload__label" for="image__upload">
 <img class="image-upload__img" src="src/img/manifest/icons/upload-photo.svg" alt="">
</label> <input id="image__upload" type="file" accept=".png, .jpg, .jpeg" class="messenger-user__input-upload image-upload"></div>`

        document.querySelector('.messenger-user__person').innerHTML =
            `<h2 id="name" class="messenger-user__name">${me.login}</h2>` +
            `<div class="messenger-user__person--edit"><span class="messenger-user__status">Status</span>` +
            `<button type="button" class="messenger-user__edit"></button>` +
            `</div><div class="status-block" contenteditable="false">${me.status}</div>`
        document.querySelector('.messenger-user__username-block-email').innerHTML =
            `<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">${me.email}</span>`;
        document.querySelector('.messenger-user__btn--cont').innerHTML = '<a href="index.html" class="messenger-user__message">Выйти</a>'
        const imageUploadBlock = document.getElementById('image__upload')
        const userPhoto = document.querySelector('.messenger-user__photo--container')
        const serverAvatarUploadBlock = document.getElementById('server-image__upload')
        const serverAvatar = document.querySelector('.server-popup__avatar-container')

        userPhoto.addEventListener('mouseenter', () => {
            userPhoto.classList.add('messenger-user__photo--before');
            document.querySelector('.messenger-user__btn').style.display = 'block';
        })
        userPhoto.addEventListener('mouseleave', () => {
            userPhoto.classList.remove('messenger-user__photo--before')
            document.querySelector('.messenger-user__btn').style.display = 'none';
        })
        imageUploadBlock.addEventListener('change', () => {
            let fileList = imageUploadBlock.files;
            const formData = new FormData()
            formData.append('avatar', fileList[0])
            myAxios.put('/users/avatar',
                formData
            ).then(async () => {
                avatar = await myAxios.get('users/avatar' + me.id)
                document.querySelector('.user__photo-img').src = avatar.data
            })
        })
        serverAvatar.addEventListener('mouseenter', () => {
            serverAvatar.classList.add('server-popup__avatar-container--before');
            document.querySelector('.server-popup__label').style.display = 'block';
        })
        serverAvatar.addEventListener('mouseleave', () => {
            serverAvatar.classList.remove('server-popup__avatar-container--before')
            document.querySelector('.server-popup__label').style.display = 'none';
        })
        serverAvatarUploadBlock.addEventListener('change', () => {
            let fileList = serverAvatarUploadBlock.files;
            formData = new FormData()
            formData.append('avatar', fileList[0])

            let reader = new FileReader();
            reader.readAsDataURL(fileList[0]);
            reader.onload = function () {
                document.querySelector('.server-popup__avatar-container').style.background = `url("${reader.result}")`
                document.querySelector('.server-popup__avatar-container').style.backgroundSize = '100%'
            };
            reader.onerror = function (error) {
                alert('Ошибка:' + error)
            };
        })
        document.querySelector('.messenger-user__edit').addEventListener('click', () => {
            if (document.querySelector('.status-block').contentEditable == "true") {
                document.querySelector('.messenger-user__edit').style.background = 'url("src/img/manifest/icons/edit.svg") no-repeat center';
                document.querySelector('.status-block').contentEditable = "false";
                me.status = document.querySelector('.status-block').innerHTML;
                myAxios.put('users/status', {status: me.status})

            } else {
                document.querySelector('.messenger-user__edit').style.background = 'url("src/img/manifest/icons/apply.svg") no-repeat center';
                document.querySelector('.status-block').contentEditable = "true";
            }
        })
        booleanInfo = !booleanInfo;
    } else {
        let avatar;
        if (obj.avatar !== 'user.png') {
            avatar = await myAxios.get('users/avatar' + obj.id)
            avatar = avatar.data
        } else {
            avatar = 'src/img/manifest/messenger/' + obj.avatar
        }
        let html = `<div class="messenger-user__photo">
    </div><div class="messenger-user__info">
        <div class="messenger-user__person">
            <div class="messenger-user__person--edit">
                <span class="messenger-user__status">Status</span>
                <button type="button" class="messenger-user__edit"></button>
            </div>
            <div class="status-block" contenteditable="true">${obj.status}</div>
        </div>
        <ul class="messenger-user__networks ulres">
            <li class="messenger-user__link"><a href="#"></a></li>
            <li class="messenger-user__link messenger-user__link--git"><a href="#"></a></li>
        </ul>
        <div class="messenger-user__username-block">
         <span class='messenger-user__username'>Логин</span>
                ${obj.login}
        </div>
        <div class="messenger-user__username-block messenger-user__username-block-email">
            <span class="messenger-user__username">Email</span>
        </div>
        <div class="messenger-user__btn--cont">

        </div>
    </div>`

        document.querySelector('.messenger-user').innerHTML = html;
        document.querySelector('.messenger-user__photo').innerHTML =
            `<div id="UserPhoto" class="messenger-user__photo--container">` +
            `<img src="${avatar}" alt="user" class="user__photo-img">`
        document.querySelector('.messenger-user__person').innerHTML =
            `<h2 id="name" class="messenger-user__name">${obj.login}</h2>` +
            `<div class="messenger-user__person--edit"><span class="messenger-user__status">Status</span>` +
            `</div><div class="status-block" contenteditable="false">${obj.status}</div>`
        document.querySelector('.messenger-user__username-block-email').innerHTML =
            `<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">${obj.email}</span>`;

        booleanInfo = !booleanInfo;
    }
}
async function printServers(){
    let childrens = Array.from(document.querySelector('.messenger-nav-1__channels').children)
    me.servers.forEach(server => {
        let li = document.createElement('li')
        if (server.type === 'editor') {
            li.id = server.name
            li.classList.add('ide')
            li.addEventListener('click', () => {
                if (boolean) {
                    printIde(server)
                }
                boolean = !boolean
                childrens.forEach(node => {
                    node.classList.remove('active')
                })
                li.classList.add('active')
                childrens.push(li)
            })
        }
        li.classList.add('messenger-nav-1__channel')
        document.querySelector('.messenger-nav-1__channels').appendChild(li)
    })
    childrens.forEach(node => {
        if (!node.classList.contains('ide')) {
            node.addEventListener('click', async () => {
                if (!boolean) {
                    document.querySelector('.messenger-files').classList = 'messenger-user'
                    await printFriend()
                    if (me.lastOpenedChat !== -1) {
                        for (let friend of me.friends) {
                            if (friend.id == me.lastOpenedChat) {
                                printChat(friend)
                            }
                        }
                    } else {
                        printChat(me.lastOpenedChat)
                    }

                    printAccountInfo(me)
                    childrens.forEach(element => {
                        element.classList.remove('active')
                    })
                    node.classList.add('active')
                    boolean = !boolean
                }

            })
        }
    })
}
function printNotification(message) {
    let user = me.friends.find(friend => friend.id === message.fromUserId)
    document.querySelector('.message-number' + message.fromUserId).textContent =
        Number(document.querySelector('.message-number' + message.fromUserId).textContent) + 1
    let notifications = document.querySelector('.messenger-main__notification-list')
    if (notifications.childNodes.length > 0) {
        for (let i = 0; i < notifications.childNodes.length; i++) {
            if (notifications.childNodes[i].classList.contains(user.id)) {
                notifications.childNodes[i].innerText = `${document.querySelector('.message-number' + user.id).textContent} новых сообщений от ${user.login}`
                document.querySelector('.messenger-main__notification-list').childNodes = notifications
                break
            } else if (i == notifications.childNodes.length - 1) {
                notifications.childNodes[i].innerText = `Одно новое сообщение от ${user.login}`
                document.querySelector('.messenger-main__notification-list').childNodes = notifications
            }
        }
        document.querySelector('.messenger-main__notification').classList.add('messenger-main__notification--active')
    } else {
        notifications.innerHTML = `<li class="${user.id}" id="${user.id}">Одно новое сообщение от ${user.login}</li>`
        document.querySelector('.messenger-main__notification').classList.add('messenger-main__notification--active')
    }
}

function addFriend(id) {
    let boolean = me.friends.find(friend => friend.id == id)
    if (!boolean) {
        myAxios.post('users/friend', {
            myId: me.id,
            userId: id
        }).then(response => {
            me.friends = response.data.friends
            printFriend()
            socket.emit('friendAdd', {friendId: id})
        })
    } else {
        alert('Есть такой друг')
    }

}

async function printFriend() {
    let html = "<h2 class=\"messenger-nav-2__title\">friends</h2>";
    document.querySelector('.messenger-nav-2__friends').innerHTML = html;
    if (me.friends.length == 0) {
        return
    }
    for (let i = 0; i < me.friends.length; i++) {
        html = ''
        html += '<ul class="messenger-nav-2__friends-list ulres"><li class="messenger-nav-2__friend" id="messenger-nav-2__friend' + me.friends[i].id + '"><a href="#">'
        if (me.friends[i].avatar == 'user.png') {
            html += `<img id="${me.friends[i].id}" src='src/img/manifest/messenger/${me.friends[i].avatar}' alt="user"><h2 class="messenger-nav-2__friend--user">${me.friends[i].login}</h2><span class="message-number message-number${me.friends[i].id} "></span></a></li></ul>`
        } else {
            let avatar = await myAxios.get('users/avatar' + me.friends[i].id)
            html += `<img id="${me.friends[i].id}" src='${avatar.data}' alt="user"><h2 class="messenger-nav-2__friend--user">${me.friends[i].login}</h2>
        <span class="message-number message-number${me.friends[i].id} "></span></a></li></ul>`
        }
        document.querySelector('.messenger-nav-2__friends').insertAdjacentHTML('beforeend', html)
        document.getElementById('messenger-nav-2__friend' + me.friends[i].id).addEventListener('click', () => {
            printChat(me.friends[i])
        });
    }

}

function htmlMessages(messages) {
    let html = ``
    messages.forEach(message => {
        if (message.fromUserId === me.id) {
            let data = new Date(Date.parse(message.data));
            let minutes;
            if (data.getMinutes() < 10) {
                minutes = "0" + data.getMinutes()
            } else {
                minutes = data.getMinutes()
            }
            html += "<div class='message-to'><p>" + message.text + "</p><span class='message__time--to'>"
                + data.getHours() + ":" + minutes + "</span></div>";
        } else if (message.toUserId === me.id) {
            let data = new Date(Date.parse(message.data));
            let minutes;
            if (data.getMinutes() < 10) {
                minutes = "0" + data.getMinutes()
            } else {
                minutes = data.getMinutes()
            }
            html += `<div class='message-from'><p>${message.text}</p><span class='message__time--from'> 
                 ${data.getHours()}:${minutes} </span></div>`;
        }
    })
    return html
}

function printChat(user) {
    if (user !== -1) {
        document.querySelector('.message-number' + user.id).textContent = ''
        me.lastOpenedChat = user.id
        myAxios.put('users/lastOpenedChat', {chat: user.id})
        let unreadedMessage = []
        for (let i = user.messages.length - 1; i >= 0; i--) {
            if (user.messages[i].readed == false) {
                user.messages[i].readed = true
                unreadedMessage.push(user.messages[i])
            } else {
                break
            }
        }
        myAxios.put('message/read', unreadedMessage)
    }
    let html = ``;
    let message;
    if (user === -1) {
        html += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">None</span>`
        message = 'Заведи сначала друзей)'
    } else {
        message = htmlMessages(user.messages)
        html += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">` + user.login + `</span>`
    }
    html += `<button class="messenger-main__favorite"></button><button class="messenger-main__delete"></button></div>
        <div class="messenger-main__settings"><div class="messenger-nav-2__search">
        <input type="text" class="messenger-nav-2__search-input" autocomplete="none" placeholder="Search..."><button class="messenger-nav-2__search-btn"></button></div>
        <div class="messenger-main__notification--block"><ol class="messenger-main__notification-list ulres "></ol><button class="messenger-main__notification"></button></div><button class="messenger-main__other"></button></div></div>`

    html += `<div class="messenger-main__chat"><ol class="messenger-main__chat-list ulres">` + message + `</ol></div>`
    html += `<div class="messenger-main__message"><form action="" id="message"><div class="messenger-main__fails">
        <button form="message" class="messenger-main__document"></button><button form="message" class="messenger-main__voice"></button></div>
        <div class="messenger-main__message-text" data-text="Message" contenteditable="true"></div><div class="messenger-main__push-block"><div class="messenger-main__emoji-block">
        <ol class="messenger-main__emoji-list ulres "></ol><button type="button" class="messenger-main__emoji"></button></div></button> 
        <button type="reset" class="messenger-main__push">
        </button></div></form></div></div>`
    document.querySelector('.messenger-main').innerHTML = html;
    let nodes = document.querySelector(`.messenger-main__notification-list`).childNodes
    document.querySelector('.messenger-main__notification').addEventListener('click', () => {
        if (document.querySelector('.messenger-main__notification-list').style.display == 'flex') {
            document.querySelector('.messenger-main__notification-list').style.display = 'none';
            setTimeout(() => {
                document.querySelector('.messenger-main__notification-list').style.width = '0';
                document.querySelector('.messenger-main__notification-list').style.height = '0';
            }, 1)

        } else {
            document.querySelector('.messenger-main__notification-list').style.display = 'flex';
            setTimeout(() => {
                document.querySelector('.messenger-main__notification-list').style.width = '250px';
                document.querySelector('.messenger-main__notification-list').style.height = '100px';
            }, 1)


        }

    })
    document.querySelector('.messenger-main__delete').addEventListener('click', () => {
        deleteFriend(user.id)
    })
    document.querySelector('.messenger-main__other').addEventListener('click', () => {
        printAccountInfo(user)
    })
    document.querySelector('.messenger-main__push').addEventListener('click', () => {
        sendMessage(user.id);
        document.querySelector('.messenger-main__message-text').innerHTML = ''
        return false;
    })
    document.querySelector('.messenger-main__message-text').onkeydown = (e) => {
        if (e.keyCode === 13 && e.shiftKey) {
            if (document.querySelector('.messenger-main__message-text').innerHTML !== "") {
                document.querySelector('.messenger-main__message-text').insertAdjacentHTML('beforeend', '<br>')
            }
        } else if (e.key === 'Enter') {
            sendMessage(user.id);
            document.querySelector('.messenger-main__message-text').innerHTML = ''
            return false;
        }
    }
    document.querySelector('.messenger-main__message-text').addEventListener("paste", function (e) {
        e.preventDefault();
        if (e.clipboardData.types[0] == 'text/plain' || e.clipboardData.types[0] == 'text/html') {
            let text = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, text);
        } else if (e.clipboardData.types[0] == 'Files') {
            // let item = e.clipboardData.items[0];
            // if (item.type.indexOf("image") == 0){
            //     let blob = item.getAsFile();
            //     document.querySelector('.messenger-main__message-text').insertAdjacentHTML('beforeend','<img>')
            //     let reader = new FileReader();
            //     reader.onload = function(event) {
            //         let child =  document.querySelector('.messenger-main__message-text').childNodes
            //         for (let i = 0; i < child.length; i++) {
            //             if(child[i].localName == 'img'){
            //                 child[i].src = event.target.result;
            //             }
            //         }
            //
            //     }
            //     reader.readAsDataURL(blob);
            //
            // }
        }
    });
    document.querySelector('.messenger-main__emoji').addEventListener('click', e => {
        let html = ``;
        for (let i = 0; i < Emoji.length; i++) {
            html += `<img onclick="EmojiPrint('` + Emoji[i].src + `')" class="messenger-main__emoji-img" src="` + Emoji[i].src + `">`
        }
        document.querySelector('.messenger-main__emoji-list').innerHTML = html;
        if (document.querySelector('.messenger-main__emoji-list').style.display == 'flex') {
            document.querySelector('.messenger-main__emoji-list').style.display = 'none';
            document.querySelector('.messenger-main__emoji-list').style.transform = 'scale(0)';
        } else {
            document.querySelector('.messenger-main__emoji-list').style.display = 'flex';
            document.querySelector('.messenger-main__emoji-list').style.transform = 'scale(1)';
        }

    })
    document.querySelector('.messenger-main__chat').scrollBy(0, document.querySelector('.messenger-main__chat').scrollHeight)

}

function sendMessage(id) {
    let dataOfMsg = document.querySelector('.messenger-main__message-text').innerHTML
    dataOfMsg = dataOfMsg.replace(/\&nbsp\;/gi, ' ');
    if (dataOfMsg.split(' ').join('').length == 0) {
        return;
    }
    let message = {
        fromUserId: me.id,
        toUserId: id,
        text: dataOfMsg,
        data: new Date()
    }
    myAxios.post('/users/message', message)
        .then(response => {
            let message = response.data
            me.friends.find(friend => friend.id == id).messages.push(message)
            let data = new Date(Date.parse(message.data));
            let minutes;
            if (data.getMinutes() < 10) {
                minutes = "0" + data.getMinutes()
            } else {
                minutes = data.getMinutes()
            }
            document.querySelector('.messenger-main__chat-list')
                .insertAdjacentHTML('beforeend', `<div class='message-to'>
    <p>${message.text}</p><span class='message__time--to'> 
                 ${data.getHours()}:${minutes} </span></div>`);
            document.querySelector('.messenger-main__chat').scrollBy(0, document.querySelector('.messenger-main__chat').scrollHeight)

        })
    socket.send(message)
}

function createServer(type) {
    let form = document.forms['server-popup-settings__form']
    myAxios.post('servers', {
        name: form.elements.name.value,
        type: type,
        directory:me.directory
    }).then(async response=>{
        const server = response.data
        me.servers.push(server)
        let li = document.createElement('li')
        if (server.type === 'editor') {
            li.id = server.name
            li.classList.add('ide')
            li.addEventListener('click', () => {
                if (boolean) {
                    printIde(server)
                }
                boolean = !boolean
                childrens.forEach(node => {
                    node.classList.remove('active')
                })
                li.classList.add('active')
                childrens.push(li)
            })
        }
        li.classList.add('messenger-nav-1__channel')
        document.querySelector('.messenger-nav-1__channels').appendChild(li)
    })
}

function chooseServer(type) {
    showPopup(document.querySelector('#server-popup-settings'))
    if (type === 'editor') {
        document.querySelector('.server-popup__avatar-container').style.background = "url('src/img/manifest/messenger/ide.svg')no-repeat"
        document.querySelector('.server-popup__create-button').onclick = () => {
            createServer(type)
        }
    } else {
        document.querySelector('.server-popup__avatar-container').style.background = "url('src/img/manifest/messenger/server.svg') no-repeat"
        document.querySelector('.server-popup__create-button').onclick = () => {
            createServer(type)
        }
    }
    document.querySelector('.server-popup__avatar-container').style.backgroundSize = '100%'
}

document.querySelector('.server-popup__create-editor').addEventListener('click', () => {
    chooseServer('editor')
})
document.querySelector('.server-popup__create-normal').addEventListener('click', () => {
    chooseServer('normal')
})
let results = [];

class Result {
    Input = "";
    Target = "";
    #IndexOfSimilarity = -1;

    get IndexOfSimilarity() {
        if (this.#IndexOfSimilarity == -1) {
            this.#IndexOfSimilarity = this.#GetIndexOfSimilarity();
        }

        return this.#IndexOfSimilarity;
    }

    constructor(input, target) {
        this.Input = input;
        this.Target = target;
    }

    #FindSumbolsCount(str) {
        let result = [[], []];
        for (let i = 0; i < str.length; i++) {
            let index = result[0].indexOf(str[i]);
            if (index == -1) {
                result[0].push(str[i]);
                result[1].push(1);
            } else {
                result[1][index]++;
            }
        }

        return result;
    }

    #GetSimilarityCount(max) {
        let index = 0;
        for (
            let i = 0; i < max; i++) {
            if (this.Target.login[i] == this.Input[i]) {
                index++;
            }
        }

        return index;
    }

    #IsSubString() {
        let str =
            this.Target.login.length >= this.Input.length
                ? this.Target.login
                : this.Input;
        let substr =
            this.Target.login.length < this.Input.length
                ? this.Target.login
                : this.Input;

        for (let i = 0, k = 0; i < str.length; i++) {
            if (str[i] == substr[k]) {
                if (k == substr.length - 1) {
                    return true;
                }

                k++;
            }
        }

        return false;
    }

    #GetIndexOfSimilarity() {
        let max =
            this.Target.login.length >= this.Input.length
                ? this.Target.login.length
                : this.Input.length;
        let cur = this.#GetSimilarityCount(max);
        let count = cur / max;

        let isSub = this.#IsSubString() ? 1 : 0;

        let inputcount = this.#FindSumbolsCount(this.Input);
        let targetcount = this.#FindSumbolsCount(this.Target.login);

        let prev = targetcount[0].length;

        for (
            let i = 0;
            i < targetcount[0].length && inputcount[0].length > 0;
            i++
        ) {
            let index = inputcount[0].indexOf(targetcount[0][i]);

            if (index != -1) {
                if (targetcount[1][i] > inputcount[1][index]) {
                    targetcount[0][i] -= inputcount[1][index];

                    inputcount[0].splice(index, 1);
                    inputcount[1].splice(index, 1);
                } else if (
                    targetcount[1][i] < inputcount[1][index]
                ) {
                    inputcount[1][index] -= targetcount[1][i];

                    targetcount[0].splice(i, 1);
                    targetcount[1].splice(i, 1);

                    i--;
                } else {
                    inputcount[0].splice(index, 1);
                    inputcount[1].splice(index, 1);

                    targetcount[0].splice(i, 1);
                    targetcount[1].splice(i, 1);

                    i--;
                }
            }
        }

        let left = 1 - targetcount[0].length / prev;

        return (count + isSub + left) / 3;
    }

    ToString() {
        return this.#IndexOfSimilarity > 0
            ? `<span class="cursor" onclick="addFriend(` + this.Target.id + `)">` + this.Target.login + `</span>`
            : "";
    }
}

let words = [];
let h1 = document.querySelector('.messenger-nav-2__user1');
let h2 = document.querySelector('.messenger-nav-2__user2');
let h3 = document.querySelector('.messenger-nav-2__user3');
let textarea = document.querySelector('.messenger-nav-2__search-input');
let searchBlock = document.querySelector('.messenger-nav-2__search-rez')
let searchBtn = document.querySelector('.messenger-nav-2__search-btn')
document.querySelector('.messenger-nav-2__search-input').onkeyup = changed;

function changed() {
    myAxios.get('users').then(response => {
        results = [];
        words = textarea.value.split(" ");
        response.data.forEach((f) => {
            if (f.id != JSON.parse(localStorage.me).id) {
                results.push(
                    new Result(words[words.length - 1].toLowerCase(), f)
                );
            }

        });

        if (results.length > 1) {
            results.sort((a, b) => {
                return a.IndexOfSimilarity > b.IndexOfSimilarity ? -1 : 1;
            });
        } else {
            results[0].IndexOfSimilarity
        }

        if (textarea.value === '') {
            searchBlock.style.display = 'none'
            searchBtn.classList.remove('messenger-nav-2__search-btn--close')
        } else {
            searchBlock.style.display = 'flex'
            searchBtn.classList.add('messenger-nav-2__search-btn--close')
            let searchBtnClose = document.querySelector('.messenger-nav-2__search-btn--close')
            searchBtnClose.addEventListener('click', function () {
                searchBlock.style.display = 'none'
                searchBtn.classList.remove('messenger-nav-2__search-btn--close')
                textarea.value = ''
            })
        }
        h1.innerHTML = results[0].ToString();
        h2.innerHTML = results[1].ToString()
        h3.innerHTML = results[2].ToString()
    })
}