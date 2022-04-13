const requestURLusers = "https://conectt.herokuapp.com/users";
const requestURLMessages = "https://conectt.herokuapp.com/messages";
let booleanInfo = true;
let UserId = -1;
let UsersMy = [];
localStorage.setItem('toUser', -1)
class User {
    Login = "";
    Email = "";
    Password = "";
    Messages = [];
    Friends = [];
    Avatar = "";
    Status = "";
    Socials = [];

    constructor(login, password, email,Avatar = "img/manifest/messenger/user.png",
                Status = "",
                Socials = []) {
        this.Login = login;
        this.Password = password;
        this.Email = email;
        this.Avatar = Avatar;
        this.Status = Status;
        this.Socials = Socials;
    }
}
class Messages {
    static  id;
    FromUserId = 0;
    ToUserId = 0;
    Message = "";
    Data = "";
    Id = 0;
    constructor(fromuserid, touserid, message, data) {
        this.FromUserId = fromuserid;
        this.ToUserId = touserid;
        this.Message = message;
        this.Data = data;
        this.Id = Messages.id++
    }
}
class Social {
    Name = "";
    Source = "";
    constructor(name,src) {
        this.Name = name;
        this.Source = src;
    }
}
/*
3)Уведомление.
 */
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
    let newMe = JSON.parse(localStorage.meUser);
    let myFriends;
    let friendFriends;
    sendRequest(requestURLusers).then(data => {
        debugger
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == newMe.id) {
                myFriends = data[i].Friends;
            }
            if (data[i].id == id) {
                friendFriends = data[i].Friends;
                UsersMy.push(data[i])
            }
        }
        for (let i = 0; i < myFriends.length; i++) {
            if (myFriends[i] == id){
                alert('Есть уже этот друг')
                return;
            }
        }
        newMe.Friends.push(id);
        localStorage.meUser = JSON.stringify(newMe)
        myFriends.push(id)
        friendFriends.push(newMe.id)
        printFriend();
        fetch(requestURLusers + "/" + newMe.id, {
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
function deleteFriend(id) {
    let newMe = JSON.parse(localStorage.meUser);
    if(confirm('Вы уверены что хотите удалить этого друга?') == false){
        return;
    }
    let booleanCheck = true;
    let myFriends;
    let friendFriends;
    for (let i = 0; i < UsersMy.length; i++) {
        if(UsersMy[i].id == newMe.id){
            for (let j = 0; j < UsersMy[i].Friends.length; j++) {
                if (UsersMy[i].Friends[j] == id){
                    booleanCheck = false;
                }
            }
        }
    }
    if(booleanCheck){
        alert('Нет такого друга.')
        return;
    }
    sendRequest(requestURLusers).then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == newMe.id) {
                myFriends = data[i].Friends;
            }
            if (data[i].id == id) {
                friendFriends = data[i].Friends;
            }
        }
        let deleteIndex = myFriends.indexOf(id)
        if(deleteIndex !== -1){
            myFriends.splice(deleteIndex,1);
            friendFriends.splice(deleteIndex,1)
        }
        newMe.Friends = myFriends;
        localStorage.meUser = JSON.stringify(newMe)
        printFriend();
        if (newMe.Friends.length >= 1){
            printChat(newMe.Friends[0])
        }
        if(newMe.Friends.length == 0){
            printChat(-1)
        }
        fetch(requestURLusers + "/" + newMe.id, {
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
                    if (meObj.Messages.length < data[i].Messages.length){
                        data[i].Friends.forEach(user=>{
                            let myMessages = 0;
                            let newMyMessages = 0;
                            for (let j = 0; j < data[i].Messages.length; j++) {
                                if(user == data[i].Messages[j].FromUserId||user == data[i].Messages[j].ToUserId){
                                    newMyMessages += 1;
                                }
                            }
                            for (let j = 0; j < meObj.Messages.length; j++) {
                                if(user == meObj.Messages[j].FromUserId||user == meObj.Messages[j].ToUserId){
                                    myMessages += 1;
                                }
                                if (meObj.Messages.length == (j + 1)){
                                    let count = (newMyMessages - myMessages)
                                    if(count > 0){
                                        printNotification(count,user)
                                    }

                                }
                            }
                        })
                        for (let j = 0; j < data[i].Messages.length; j++) {
                            if ((data[i].Messages[j].FromUserId == localStorage.toUser) && (data[i].Messages[j].ToUserId == meObj.id) || (data[i].Messages[j].FromUserId == meObj.id) && (data[i].Messages[j].ToUserId == localStorage.toUser)) {

                                let html = printMessages(data[i], fromUser);
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
                let data = new Date(Date.parse(this.Messages[i].Data));
                let minutes;
                if(data.getMinutes() < 10&&data.getMinutes() > 0){
                    minutes = "0" + data.getMinutes()
                }
                else{
                    minutes = data.getMinutes()
                }
                html += "<div class='message-from'><p>" + this.Messages[i].Message + "</p><span class='message__time--from'>"
                    + data.getHours() +":"+minutes+"</span></div>";
            }
            if (this.Messages[i].ToUserId === fromObj.id){
                let data = new Date(Date.parse(this.Messages[i].Data));
                let minutes;
                if(data.getMinutes() < 10){
                    minutes = "0" + data.getMinutes()
                }
                else{
                    minutes = data.getMinutes()
                }
                html += "<div class='message-to'><p>" + this.Messages[i].Message + "</p><span class='message__time--to'>"
                    + data.getHours() +":" + minutes +"</span></div>";
            }
        }
        return html;

    }
}
function printNotification(count,user){
    document.querySelector('.message-number'+user).innerHTML = count;
}
function printAccountInfo(obj){
    if (booleanInfo){
        let me = JSON.parse(localStorage.meUser);
        document.querySelector('.messenger-user__photo').src = me.Avatar
        html = "<span class='messenger-user__username'>" + me.Login + "</span>"
        html += "<span id='name-text' class='messenger-user__username-text'>@" + me.Login + "</span>"
        document.querySelector('.messenger-user__username-block').innerHTML = html;
        document.querySelector('.messenger-user__person').innerHTML =
            '<h2 id="name" class="messenger-user__name">' +me.Login +'</h2>' +
            '<div class="messenger-user__person--edit">' + '<span class="messenger-user__status">Status</span>' +
            '<button type="button" class="messenger-user__edit"></button>' +
            '</div><div class="status-block" contenteditable="true"></div>'
        document.querySelector('.messenger-user__username-block-email').innerHTML =
            '<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">' + me.Email + '</span>'
        booleanInfo = !booleanInfo;
    }
    else if(booleanInfo == false){
        document.querySelector('.messenger-user__photo').src = obj.Avatar
        html = "<span class='messenger-user__username'>" + obj.Login + "</span>"
        html += "<span id='name-text' class='messenger-user__username-text'>@" + obj.Login + "</span>"
        document.querySelector('.messenger-user__username-block').innerHTML = html;
        document.querySelector('.messenger-user__person').innerHTML =
            '<h2 id="name" class="messenger-user__name">' +obj.Login +'</h2><span class="messenger-user__status">Status</span>'
        document.querySelector('.messenger-user__username-block-email').innerHTML =
            '<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">' + obj.Email + '</span>';
        booleanInfo = !booleanInfo;
    }
}

function printFriend() {
    let html = "<h2 class=\"messenger-nav-2__title\">friends</h2>";
    let obj = JSON.parse(localStorage.meUser);
    for (let i = 0; i < obj.Friends.length; i++) {
        for (let j = 0; j < UsersMy.length; j++) {
            if (UsersMy[j].id === obj.Friends[i]) {
                html += '<ul class="messenger-nav-2__friends-list ulres"><li class="messenger-nav-2__friend" onclick="printChat(' + UsersMy[j].id + ')"><a href="#">'
                html += '<img src="./img/manifest/messenger/user.png" alt="user"><h2 class="messenger-nav-2__friend--user">' + UsersMy[j].Login + '</h2><span class="message-number message-number'+UsersMy[j].id+'"></span></a></li></ul>'
                break;
            }
        }
    }
    document.querySelector('.messenger-nav-2__friends').innerHTML = html;
}
function printChat(userID) {
    localStorage.toUser = userID;
    let obj;
    let myObject = JSON.parse(localStorage.meUser)
    for (let i = 0; i < myObject.Friends.length; i++) {
        if (myObject.Friends[i] === userID) {
            for (let j = 0; j < UsersMy.length; j++) {
                if (UsersMy[j].id === userID) {
                    obj = UsersMy[j];
                }
            }
        }

    }
    let html = ``;
    let message;
    if(UserId == -1 || myObject.Friends.length == 0){
        html  += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">None</span>`
        message = 'Заведи сначала друзей)'
    }
    else{
        message = printMessages(myObject, obj)
        html  += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">`+obj.Login+`</span>`
    }
    html += `<button class="messenger-main__favorite"></button><button class="messenger-main__delete"></button></div>
    <div class="messenger-main__settings"><div class="messenger-nav-2__search">
    <input type="text" class="messenger-nav-2__search-input" autocomplete="none" placeholder="Search..."><button class="messenger-nav-2__search-btn"></button></div>
    <button class="messenger-main__notification messenger-main__notification--active"></button><button class="messenger-main__other"></button></div></div>`

    html += `<div class="messenger-main__chat"><ol class="messenger-main__chat-list ulres">` + message + `</ol></div>`
    html += `<div class="messenger-main__message"><form action="" id="message"><div class="messenger-main__fails">
    <button form="message" class="messenger-main__document"></button><button form="message" class="messenger-main__voice"></button></div>
    <div class="messenger-main__message-text" data-text="Message" contenteditable="true"></div><div class="messenger-main__push-block"><div class="messenger-main__emoji-block">
    <ol class="messenger-main__emoji-list ulres "></ol><button type="button" class="messenger-main__emoji"></button></div></button> 
    <button type="reset" class="messenger-main__push">
    </button></div></form></div></div>`
    document.querySelector('.messenger-main').innerHTML = html;
    document.querySelector('.messenger-main__delete').addEventListener('click',()=>{
        deleteFriend(obj.id)
    })
    document.querySelector('.messenger-main__other').addEventListener('click',()=>{
        printAccountInfo(obj)
    })
    document.querySelector('.messenger-main__push').addEventListener('click',()=>{
        sendMessage(obj.id)
    })
    document.querySelector('.messenger-main__message-text').onkeydown = (e) => {
        if(e.keyCode === 13 && e.shiftKey){
            if(document.querySelector('.messenger-main__message-text').innerHTML !== ""){
                document.querySelector('.messenger-main__message-text').insertAdjacentHTML('beforeend','<br>')
            }
        }
        else if (e.key === 'Enter'){
            sendMessage(userID);
            return false;
        }
    }
    document.querySelector('.messenger-main__message-text').addEventListener("paste", function(e) {
        e.preventDefault();
        if(e.clipboardData.types[0] == 'text/plain'||e.clipboardData.types[0] == 'text/html'){
            let text = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, text);
        }
        else if(e.clipboardData.types[0] == 'Files'){
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
    document.querySelector('.messenger-main__emoji').addEventListener('click',e=>{
        let html = ``;
        for (let i = 0; i < Emoji.length;i++){
            html += `<img onclick="EmojiPrint('`+Emoji[i].src+`')" class="messenger-main__emoji-img" src="`+Emoji[i].src+`">`
        }
        document.querySelector('.messenger-main__emoji-list').innerHTML = html;
        if(document.querySelector('.messenger-main__emoji-list').style.display == 'flex'){
            document.querySelector('.messenger-main__emoji-list').style.display = 'none';
            document.querySelector('.messenger-main__emoji-list').style.transform = 'scale(0)';
        }
        else{
            document.querySelector('.messenger-main__emoji-list').style.display = 'flex';
            document.querySelector('.messenger-main__emoji-list').style.transform = 'scale(1)';
        }

    })
}
function EmojiPrint(src){
    document.querySelector('.messenger-main__message-text').insertAdjacentHTML("beforeend", "<img src='"+src+"' class=\"messenger-main__emoji-image\">")
}
function printMessages(obj, fromObj) {
    if (obj.Friends.length === 0) {
        return;
    }
    if (typeof fromObj == 'number') {
        for (let i = 0; i < UsersMy.length; i++) {
            if (UsersMy[i].id === fromObj) {
                fromObj = UsersMy[i];
            }
        }
    }
    let html = obj.printMessagesClass(fromObj);
    return html;
}
function sendMessage(touserid) {
    let me = JSON.parse(localStorage.meUser).id
    let msg = document.querySelector('.messenger-main__message-text').innerHTML;
    document.querySelector('.messenger-main__message-text').innerHTML = "";
    let Data = new Date();
    if (msg === "") {
        return;
    }
    msg = new Messages(me, touserid, msg,Data)
    let MessagesAll = [];
    MessagesAll.push(msg);
    let MyMessagesAll = [];
    MyMessagesAll.push(msg);
    sendRequest(requestURLusers).then(data => {
        data.forEach(user => {
            if (user.id === touserid) {
                for (let j = 0; j < user.Messages.length; j++) {
                    MessagesAll.push(user.Messages[j]);
                }
            }
            if (user.id === me) {
                for (let j = 0; j < user.Messages.length; j++) {
                    MyMessagesAll.push(user.Messages[j]);
                }
            }
        })

        for (let i = 0; i < UsersMy.length; i++) {
            if (UsersMy[i].id === touserid) {
                UsersMy[i].Messages = MessagesAll;
            }
            if (UsersMy[i].id === me) {
                UsersMy[i].Messages = MyMessagesAll;
                localStorage.meUser = JSON.stringify(UsersMy[i])
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
        e.preventDefault();
        let emailValue = document.forms[0].elements.email.value;
        let passwordValue = document.forms[0].elements.password.value;
        sendRequest(requestURLusers).then(Users => {
            for (let i = 0; i < Users.length; i++) {
                if ((Users[i].Password === passwordValue) && (Users[i].Email === emailValue)) {
                    localStorage.clear();
                    localStorage.setItem('meUser', JSON.stringify(Users[i]));
                    infoCheck();
                    location.href = './messenger.html';
                    return;
                }
            }
            alert("Нет такого пользователя")
        })
    })
}