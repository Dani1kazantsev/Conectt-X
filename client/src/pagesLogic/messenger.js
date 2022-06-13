let me;
let avatarSrc = `../serv/clientFiles/images/avatars/`
let lastMessage;
io('http://localhost:500').emit('closeSocket', 'closeSocket')
const socket = io('http://localhost:500');

myAxios.get(`users/me${JSON.parse(localStorage.getItem('me')).id}`).then((res) => {
    me = res.data
    if(me.avatar !== 'user.png'){
        me.avatar = `../serv/clientFiles/images/avatars/${me.avatar}`
    }else{
        me.avatar = `src/img/manifest/messenger${me.avatar}`
    }

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
        console.log('Disconnected');
    });
    socket.on('message', function (message) {

        if (lastMessage == undefined && message.fromServer) {
            me.friends.find(friend => friend.id == message.fromUserId).messages.push(message)
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
        } else if(message.fromServer){
            lastMessage = undefined
        }
    })
    printAccountInfo(me);
    printFriend()
    if(me.friends.length > 0){
        printChat(me.friends[0])
    }else {printChat(-1)}

})

function printAccountInfo(obj) {
    if (obj.status == null) {
        obj.status = ''
    }
    document.querySelector('.messenger-user__photo').innerHTML =
        `<div id="UserPhoto" class="messenger-user__photo--container">` +
        `<img src="${obj.avatar}" alt="user" class="messenger-user__photo-img">` +
        ' <label class="messenger-user__btn" for="image__upload"></label> <input id="image__upload" type="file" accept=".png, .jpg, .jpeg" class="messenger-user__input-upload">'
    html = "<span class='messenger-user__username'>" + obj.login + "</span>";
    html += `<span id='name-text' class='messenger-user__username-text'>@${obj.login}</span>`;
    document.querySelector('.messenger-user__username-block').innerHTML = html;
    document.querySelector('.messenger-user__person').innerHTML =
        `<h2 id="name" class="messenger-user__name">${obj.login}</h2>` +
        `<div class="messenger-user__person--edit"><span class="messenger-user__status">Status</span>` +
        `<button type="button" class="messenger-user__edit"></button>` +
        `</div><div class="status-block" contenteditable="false">${obj.status}</div>`
    document.querySelector('.messenger-user__username-block-email').innerHTML =
        `<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">${obj.email}</span>`;
    document.querySelector('.messenger-user__btn--cont').innerHTML = '<a href="index.html" class="messenger-user__message">Выйти</a>'

    document.getElementById('UserPhoto').addEventListener('mouseenter', () => {
        document.querySelector('.messenger-user__photo--container').classList.add('messenger-user__photo--before');
        document.querySelector('.messenger-user__btn').style.display = 'block';
    })
    document.getElementById('UserPhoto').addEventListener('mouseleave', () => {
        document.querySelector('.messenger-user__photo--container').classList.remove('messenger-user__photo--before')
        document.querySelector('.messenger-user__btn').style.display = 'none';
    })
    document.getElementById('image__upload').addEventListener('change', () => {
        let fileList = document.getElementById('image__upload').files;
        const formData = new FormData()
        formData.append('avatar', fileList[0])
        myAxios.put('/users/avatar',
            formData
        ).then(response => {
            me.avatar = response.data.avatar
            document.querySelector('.messenger-user__photo-img').src =
                avatarSrc + response.data.avatar
        })
    })
    document.querySelector('.messenger-user__edit').addEventListener('click', () => {
        if (document.querySelector('.status-block').contentEditable == "true") {
            document.querySelector('.messenger-user__edit').style.background = 'url("img/manifest/icons/edit.svg") no-repeat center';
            document.querySelector('.status-block').contentEditable = "false";
            obj.Status = document.querySelector('.status-block').innerHTML;
            localStorage.meUser = JSON.stringify(obj);
            fetch(requestURLusers + "/" + obj.id, {
                method: "PATCH",
                body: JSON.stringify({
                    Status: document.querySelector('.status-block').innerHTML
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        } else {
            document.querySelector('.messenger-user__edit').style.background = 'url("img/manifest/icons/apply.svg") no-repeat center';
            document.querySelector('.status-block').contentEditable = "true";
        }

    })
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
        })
    } else {
        alert('Есть такой друг')
    }

}

function printFriend() {
    let html = "<h2 class=\"messenger-nav-2__title\">friends</h2>";
    document.querySelector('.messenger-nav-2__friends').innerHTML = html;
    if (me.friends.length == 0) {
        document.querySelector('.messenger-nav-2__friends').innerHTML = html;
    }
    for (let i = 0; i < me.friends.length; i++) {
        html = ''
        html += '<ul class="messenger-nav-2__friends-list ulres"><li class="messenger-nav-2__friend" id="messenger-nav-2__friend' + me.friends[i].id + '"><a href="#">'
        html += `<img src='${avatarSrc + me.friends[i].avatar}' alt="user"><h2 class="messenger-nav-2__friend--user">${me.friends[i].login}</h2><span class="message-number message-number ${me.friends[i].id} "></span></a></li></ul>`
        document.querySelector('.messenger-nav-2__friends').insertAdjacentHTML('beforeend', html)
        document.getElementById('messenger-nav-2__friend' + me.friends[i].id).addEventListener('click', () => {
            printChat(me.friends[i])
        });
    }

}

function htmlMessages(messages) {
    let html = ``
    let fromUserId = Number(localStorage.getItem('chatUser'))
    messages.forEach(message => {
        if (message.fromUserId === fromUserId) {
            let data = new Date(Date.parse(message.data));
            let minutes;
            if (data.getMinutes() < 10) {
                minutes = "0" + data.getMinutes()
            } else {
                minutes = data.getMinutes()
            }
            html += "<div class='message-from'><p>" + message.text + "</p><span class='message__time--from'>"
                + data.getHours() + ":" + minutes + "</span></div>";
        } else if (message.toUserId === fromUserId) {
            let data = new Date(Date.parse(message.data));
            let minutes;
            if (data.getMinutes() < 10) {
                minutes = "0" + data.getMinutes()
            } else {
                minutes = data.getMinutes()
            }
            html += `<div class='message-to'><p>${message.text}</p><span class='message__time--to'> 
             ${data.getHours()}:${minutes} </span></div>`;
        }
    })
    return html
}

function printChat(user) {
    localStorage.setItem('chatUser', user.id)

    let html = ``;
    let message;
    if (me.friends.length === 0) {
        html += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">None</span>`
        message = 'Заведи сначала друзей)'
    } else {
        message = htmlMessages(user.messages)
        html += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">` + user.login + `</span>`
    }
    let count;
    if (document.querySelector('.messenger-main__notification-list')) {
        count = document.querySelector('.messenger-main__notification-list').childNodes.length;
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
    me.friends.forEach(friend => {
        if (count > 0) {
            if (friend.Id !== user.Id) {
                printNotification(0, friend);
            }
        }
    })
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
        sendMessage(user.id)
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
}

function sendMessage(id) {
    let message = {
        fromUserId: me.id,
        toUserId: id,
        text: document.querySelector('.messenger-main__message-text').innerHTML,
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
        })
    socket.send(message)

}

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
h1.onclick = clicked;
h2.onclick = clicked;
h3.onclick = clicked;

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


        results.sort((a, b) => {
            return a.IndexOfSimilarity > b.IndexOfSimilarity ? -1 : 1;
        });
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

    })
}

function clicked() {
    let word = this.innerHTML.split("<br>")[0];
    words[words.length - 1] = word;
    input.value = "";
    words.forEach((f) => (input.value += f + " "));
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    changed();
}
