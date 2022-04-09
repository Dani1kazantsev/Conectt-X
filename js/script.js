const requestURLusers = "https://conectt.herokuapp.com/users";
const requestURLMessages = "https://conectt.herokuapp.com/messages";
let UserId = -1;
let allMyFriends = [];
localStorage.setItem('toUser', -1)
    class User {
        Login = "";
        Email = "";
        Password = "";
        Messages = [];
        Friends = [];

        constructor(login, password, email) {
            this.Login = login;
            this.Password = password;
            this.Email = email;
        }
    }

    class Messages {
        FromUserId = 0;
        ToUserId = 0;
        Message = ""
        Data = ""

        constructor(fromuserid, touserid, message, data) {
            this.FromUserId = fromuserid;
            this.ToUserId = touserid;
            this.Message = message;
            this.Data = data;
        }
    }

function sendRequest(url) {
    return fetch(url).then(response => {
        return response.json();
    })
}

function sendRequestPost(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        credentials: 'include'
    })
}

function addFriend(id) {
    let myid = JSON.parse(localStorage.meUser).id;
    let newMe = JSON.parse(localStorage.meUser);
    newMe.Friends.push(id);
    localStorage.meUser = JSON.stringify(newMe)
    let myFriends;
    let friendFriends;
    sendRequest(requestURLusers).then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === myid) {
                myFriends = data[i].Friends;
            }
            if (data[i].id === id) {
                friendFriends = data[i].Friends;
                allMyFriends.push(data[i])
            }

        }
        for (let i = 0; i < myFriends.length; i++) {
            if (myFriends.id === id) {
                return;
            }
        }
        myFriends.push(id)
        friendFriends.push(myid)
        printFriend();
    }).then(() => {
        fetch(requestURLusers + "/" + myid, {
            method: "PATCH",
            body: JSON.stringify({
                Friends: myFriends
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        fetch(requestURLusers + "/" + id, {
            method: "PATCH",
            body: JSON.stringify({
                Friends: friendFriends
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    })
}

function infoCheck() {
    let meObj = JSON.parse(localStorage.meUser)
    setInterval(function () {
        sendRequest(requestURLusers).then(data => {
            let fromUser;
            data.forEach(user => {

                if (user.id == localStorage.toUser) {
                    fromUser = user;
                }
            });
            for (let i = 0; i < data.length; i++) {
                if (meObj.id === data[i].id) {
                    if (meObj.Messages.length < data[i].Messages.length) {
                        let allMessages = data[i].Messages;
                        meObj.Messages = allMessages;
                        for (let j = 0; j < data[i].Messages.length; j++) {
                            if ((data[i].Messages[j].FromUserId == localStorage.toUser) && (data[i].Messages[j].ToUserId == meObj.id) || (data[i].Messages[j].FromUserId == meObj.id) && (data[i].Messages[j].ToUserId == localStorage.toUser)) {
                                let html = printMessages(meObj, fromUser);
                                document.querySelector('.messenger-main__chat-list').innerHTML = html
                            }
                        }
                    }
                }

            }
        })
    }, 1000);
}
function prototypeFunctions() {
    Object.prototype.printMessagesClass = function (fromObj) {
        let html = "";
        for (let i = 0; i < this.Messages.length; i++) {
            if (this.Messages[i].FromUserId === fromObj.id){
                html += "<div class='message-from'><p>" + this.Messages[i].Message + "</p><span class='message__time--from'>"
                    + data.getHours() +":"+data.getMinutes() +"</span></div>";
            }
            if (this.Messages[i].ToUserId === fromObj.id){
                let data = new Date(Date.parse(this.Messages[i].Data));
                html += "<div class='message-to'><p>" + this.Messages[i].Message + "</p><span class='message__time--to'>"
                    + data.getHours() +":" + data.getMinutes() +"</span></div>";
            }
        }
        return html;

    }
}
function printAccountInfo(obj) {
    html = "<span class='messenger-user__username'>" + obj.Login + "</span>"
    html += "<span id='name-text' class='messenger-user__username-text'>@" + obj.Login + "</span>"
    document.querySelector('.messenger-user__username-block').insertAdjacentHTML("afterbegin", html)
    document.querySelector('.messenger-user__person').insertAdjacentHTML("afterbegin", ('<h2 id="name" class="messenger-user__name">' + obj.Login + '</h2>'))
    document.querySelector('.messenger-user__username-block-email').insertAdjacentHTML("beforeend", ('<span id="email" class="messenger-user__username-text">' + obj.Email + '</span>'))
}

function printFriend() {
    let html = "<h2 class=\"messenger-nav-2__title\">friends</h2>";
    let obj = JSON.parse(localStorage.meUser);
    for (let i = 0; i < obj.Friends.length; i++) {
        for (let j = 0; j < allMyFriends.length; j++) {
            if (allMyFriends[j].id === obj.Friends[i]) {
                html += '<ul class="messenger-nav-2__friends-list ulres"><li class="messenger-nav-2__friend" onclick="printChat(' + allMyFriends[j].id + ')"><a href="#">'
                html += '<img src="./img/manifest/messenger/user.png" alt="user">' + allMyFriends[j].Login + '</a</li></ul>'
                break
            }
        }
    }
    document.querySelector('.messenger-nav-2__friends').innerHTML = html;
}
function printChat(userID) {
    localStorage.toUser = userID;
    let obj;
    let myObject = JSON.parse(localStorage.meUser)
    if (myObject.Friends.length === 0) {
        return
    }
    for (let i = 0; i < myObject.Friends.length; i++) {
        if (myObject.Friends[i] === userID) {
            for (let j = 0; j < allMyFriends.length; j++) {
                if (allMyFriends[j].id === userID) {
                    obj = allMyFriends[j];
                }
            }
        }

    }
    let message = printMessages(myObject, obj)
    let html = `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">` + obj.Login + `</span>
    <button class="messenger-main__favorite"></button></div>
    <div class="messenger-main__settings"><div class="messenger-nav-2__search">
    <input type="text" class="messenger-nav-2__search-input" autocomplete="none" placeholder="Search..."><button class="messenger-nav-2__search-btn"></button></div>
    <button class="messenger-main__notification"></button><button class="messenger-main__other"></button></div></div>`

    html += `<div class="messenger-main__chat"><ol class="messenger-main__chat-list ulres">` + message + `</ol></div>`
    html += `<div class="messenger-main__message"><form action="" id="message"><div class="messenger-main__fails">
    <button form="message" class="messenger-main__document"></button><button form="message" class="messenger-main__voice"></button></div>
    <textarea class="messenger-main__message-text" placeholder="Message"></textarea><div class="messenger-main__push-block"><div class="messenger-main__emoji-block"><ol class="messenger-main__emoji-list ulres  messenger-main__emoji-list--close"></ol><button type="button" class="messenger-main__emoji"></button></div></button> <button type="reset" class="messenger-main__push" onclick='sendMessage(` + obj.id + `)'>
    </button></div></form></div></div>`
    document.querySelector('.messenger-main').innerHTML = html
    document.querySelector('.messenger-main__message-text').onkeydown = (e) => {
        if (e.key === 'Enter') {
            sendMessage(userID);
            document.querySelector('.messenger-main__message-text').value = "";
            return false;
        }
    }

}
function printMessages(obj, fromObj) {
    if (obj.Friends.length === 0) {
        return
    }
    if (typeof fromObj == 'number') {
        for (let i = 0; i < allMyFriends.length; i++) {
            if (allMyFriends[i].id === fromObj) {
                fromObj = allMyFriends[i];
            }
        }
    }
    let html = obj.printMessagesClass(fromObj);
    return html;
}
function sendMessage(touserid) {
    let me = JSON.parse(localStorage.meUser).id
    let msg = document.querySelector('.messenger-main__message-text').value;
    let Data = new Date();
    if (msg === "") {
        return
    }
    msg = new Messages(me, touserid, msg,Data)
    let MessagesAll = [];
    MessagesAll.push(msg);
    let MyMessagesAll = [];
    MyMessagesAll.push(msg);
    sendRequest(requestURLusers).then(data => {
        data.forEach(user => {
            if (user.id === touserid) {
                for (let i = 0; i < allMyFriends.length; i++) {
                    if (user.id === allMyFriends[i]) {
                        for (let j = 0; j < user.Messages.length; j++) {
                            MessagesAll.push(user.Messages[j])
                        }
                    }
                }
            }
            if (user.id === me) {
                for (let j = 0; j < user.Messages.length; j++) {
                    MyMessagesAll.push(user.Messages[j])
                }
            }
        })

        for (let i = 0; i < allMyFriends.length; i++) {
            if (allMyFriends[i].id === touserid) {
                allMyFriends[i].Messages = MessagesAll;
            }
            if (allMyFriends[i].id === me) {
                allMyFriends[i].Messages = MyMessagesAll;
                localStorage.meUser = JSON.stringify(allMyFriends[i])
            }
        }
    }).then(() => {
        fetch(requestURLusers + "/" + touserid, {
            method: "PATCH",
            body: JSON.stringify({
                Messages: MessagesAll
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        fetch(requestURLusers + "/" + me, {
            method: "PATCH",
            body: JSON.stringify({
                Messages: MyMessagesAll
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    })
}



//login.js
if (document.querySelector('#login-main__form')) {
    document.querySelector('#login-main__form').addEventListener('submit', function (e) {
        e.preventDefault()
        let emailValue = document.forms[0].elements.email.value;
        let passwordValue = document.forms[0].elements.password.value;
        sendRequest(requestURLusers).then(Users => {
            for (let i = 0; i < Users.length; i++) {
                if ((Users[i].Password === passwordValue) && (Users[i].Email === emailValue)) {
                    localStorage.clear()
                    localStorage.setItem('meUser', JSON.stringify(Users[i]));
                    location.href = './messenger.html'
                    return;
                }
            }
            alert("Нет такого пользователя")
        })
    })
}

