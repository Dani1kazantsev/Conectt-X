const requestURLusers = "http://localhost:3000/users";
let booleanInfo = true;
let UsersMy = [];
localStorage.setItem('toUser', -1);
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
class Friend{
    Id = 0;
    Notification = 0;
    constructor(id,notification = '') {
        this.Id = id;
        this.Notification = notification;
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
    let friend = new Friend(id)
    let MeFriend = new Friend(newMe.id)
    sendRequest(requestURLusers).then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == newMe.id) {
                myFriends = data[i].Friends;
            }
            if (data[i].id == id) {
                friendFriends = data[i].Friends;
                UsersMy.push(data[i]);
            }
        }
        for (let i = 0; i < myFriends.length; i++) {
            if (myFriends[i].Id == id){
                alert('Есть уже этот друг')
                return;
            }
        }
        newMe.Friends.push(friend);
        localStorage.meUser = JSON.stringify(newMe)
        myFriends.push(friend);
        friendFriends.push(MeFriend);
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
        if(UsersMy[i].id === id){
            booleanCheck = false;
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
        for (let i = 0; i < myFriends.length; i++) {
            if (myFriends[i].Id == id){
                myFriends.splice(i,1);
            }

        }
        for (let i = 0; i < friendFriends.length; i++) {
            if (friendFriends[i].Id == newMe.id){
                friendFriends.splice(i,1);
            }
        }
        for (let i = 0; i < UsersMy.length; i++) {
            if (UsersMy[i].id == id){
                UsersMy.splice(i,1);
                break;
            }
        }
        newMe.Friends = myFriends;
        localStorage.meUser = JSON.stringify(newMe)
        printFriend();
        if (newMe.Friends.length >= 1){
            printChat(newMe.Friends[0].Id)
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
    let meObj = JSON.parse(localStorage.meUser);
    setInterval(function () {
        let meObjFriends = JSON.parse(localStorage.meUser).Friends;
        sendRequest(requestURLusers).then(data => {
            let fromUser;
            data.forEach(user => {
                if (user.id == localStorage.toUser) {
                    fromUser = user;
                }
            });
            for (let i = 0; i < data.length; i++) {
                if (meObj.id === data[i].id) {
                    // for (let j = 0; j < data.length; j++) {
                    //     UsersMy.forEach(user=>{
                    //         if(user.id == data[j].id && user.Avatar !== data[j].Avatar){
                    //             user.Avatar = data[j].Avatar;
                    //             booleanInfo = false;
                    //             printAccountInfo(user);
                    //         }
                    //     })
                    // }
                    if(meObj.Friends.length !== data[i].Friends.length){
                        if(meObj.Friends.length < data[i].Friends.length){
                            for (let j = 0; j < data[i].Friends.length; j++) {
                                data[i].Friends.forEach(friend=>{
                                    if(meObjFriends.some(e=>e.Id == friend.Id) == false){
                                        data.forEach(user=>{
                                            if(user.id == friend.Id){
                                                UsersMy.push(user);
                                                meObjFriends.push(friend);
                                            }
                                        })
                                    }
                                })
                            }
                        }
                        else if(meObjFriends.length > data[i].Friends.length){
                            meObjFriends.forEach(friend=>{
                                if(data[i].Friends.some(e=>e.Id == friend.Id) == false){
                                    let index = meObjFriends.indexOf(friend);
                                    meObjFriends.splice(index,1)
                                    UsersMy.forEach(user=>{
                                        if(user.id == friend.Id){
                                            index = UsersMy.indexOf(user);
                                            UsersMy.splice(index,1)
                                        }
                                    })
                                }
                            })
                        }
                        meObj.Friends = meObjFriends;
                        localStorage.meUser = JSON.stringify(meObj);
                        printFriend();
                        for (let k = 0; k < meObjFriends.length; k++) {
                            if(meObjFriends[k].Id !== parseInt(localStorage.toUser)){
                                printNotification(meObjFriends[k].Notification,meObjFriends[k])
                            }
                        }
                    }

                    if (meObj.Messages.length < data[i].Messages.length){
                        data[i].Friends.forEach(user=>{
                            if(user.Id !== parseInt(localStorage.toUser)) {
                                let myMessages = 0;
                                let newMyMessages = 0;
                                for (let j = 0; j < meObj.Messages.length; j++) {
                                    if(user.Id == meObj.Messages[j].FromUserId){
                                        myMessages += 1;
                                        meObj.Messages.splice(j,1);
                                        j -= 1;
                                    }
                                }
                                for (let j = 0; j < data[i].Messages.length; j++) {
                                    if(user.Id == data[i].Messages[j].FromUserId){
                                        newMyMessages += 1;
                                    }
                                    if (data[i].Messages.length == (j + 1)){
                                        meObj.Messages = data[i].Messages
                                        let count = (newMyMessages - myMessages)
                                        if(count > 0){
                                            localStorage.meUser = JSON.stringify(meObj);
                                            printNotification(count,user);
                                        }
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
            else if (this.Messages[i].ToUserId === fromObj.id){
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
    let newMe = JSON.parse(localStorage.meUser);
    let indexOfFriend;
    let FriendLogin;
    let html = '';
    let childNodes;
    if (user == -1){
    return;
    }
    for (let i = 0; i < newMe.Friends.length; i++) {
        if(newMe.Friends[i].Id == user.Id){
            indexOfFriend = i;
            break;
        }
    }
    for (let i = 0; i < UsersMy.length; i++) {
        if (UsersMy[i].id == user.Id){
            FriendLogin = UsersMy[i].Login;
        }
    }
    //Очищение уведов
    if (count == -1){
        document.querySelector('.message-number'+user.Id).innerHTML = '';
        newMe.Friends[indexOfFriend].Notification = 0;
        localStorage.meUser = JSON.stringify(newMe);
        document.getElementById(user.Id);
        return;
    }
    //Выведение уведов
    let newCount = parseInt(document.querySelector('.message-number'+user.Id).innerHTML);
    if(isNaN(newCount)){
        newCount = count;
    }
    else{
        newCount += count;
    }
    childNodes = document.querySelector('.messenger-main__notification-list').childNodes;
    if(newCount == 1){
        html = '<li id="'+user.Id+'">Новое сообщение от '+FriendLogin+'</li>';
        document.querySelector('.messenger-main__notification-list').innerHTML += html;
    }
    else if(newCount > 1){
        let boolean = true;
        for (let i = 0; i < childNodes.length; i++) {
            if(parseInt(childNodes[i].id) == user.Id){
                html = newCount+' новых сообщений от '+FriendLogin;
                document.getElementById(user.Id).innerHTML = html;
                boolean = false;
            }
        }
        if (boolean){
            html = '<li id="'+user.Id+'">'+newCount+' новых сообщений от '+FriendLogin+'</li>';
            document.querySelector('.messenger-main__notification-list').innerHTML += html;
        }
    }
    if(newCount !== 0){
        document.querySelector('.message-number'+user.Id).innerHTML = newCount;
    }

    newMe.Friends[indexOfFriend].Notification = newCount;
    //Скрипт для active класса
    if (childNodes.length == 0){
        document.querySelector('.messenger-main__notification').classList.remove('messenger-main__notification--active')
    }
    else if(childNodes.length > 0){
        document.querySelector('.messenger-main__notification').classList.add('messenger-main__notification--active')
    }
    localStorage.meUser = JSON.stringify(newMe);
}
function printAccountInfo(obj){
    if (booleanInfo){
        let me = JSON.parse(localStorage.meUser);
        document.querySelector('.messenger-user__photo').innerHTML =
            '<div class="messenger-user__photo--container" id="UserPhoto'+me.id+'">' +
            '<img src="'+me.Avatar+'" alt="user" class="messenger-user__photo">' +
            ' <label class="messenger-user__btn" for="image__upload"></label> <input id="image__upload" type="file" accept=".png, .jpg, .jpeg" class="messenger-user__input-upload">'
        html = "<span class='messenger-user__username'>" + me.Login + "</span>";
        html += "<span id='name-text' class='messenger-user__username-text'>@" + me.Login + "</span>";
        document.querySelector('.messenger-user__username-block').innerHTML = html;
        document.querySelector('.messenger-user__person').innerHTML =
            '<h2 id="name" class="messenger-user__name">' +me.Login +'</h2>' +
            '<div class="messenger-user__person--edit">' + '<span class="messenger-user__status">Status</span>' +
            '<button type="button" class="messenger-user__edit"></button>' +
            '</div><div class="status-block" contenteditable="false">'+me.Status+'</div>';
        document.querySelector('.messenger-user__username-block-email').innerHTML =
            '<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">' + me.Email + '</span>';
        document.querySelector('.messenger-user__btn--cont').innerHTML = '<a href="index.html" class="messenger-user__message">Выйти</a>'
        booleanInfo = !booleanInfo;
        document.getElementById('UserPhoto'+me.id).addEventListener('mouseenter',()=>{
            document.querySelector('.messenger-user__photo--container').classList.add('messenger-user__photo--before');
            document.querySelector('.messenger-user__btn').style.display = 'block';
        })
        document.getElementById('UserPhoto'+me.id).addEventListener('mouseleave',()=>{
            document.querySelector('.messenger-user__photo--container').classList.remove('messenger-user__photo--before')
            document.querySelector('.messenger-user__btn').style.display = 'none';
        })
        document.getElementById('image__upload').addEventListener('change',()=>{
            let fileList = document.getElementById('image__upload').files;
            let reader = new FileReader();
            reader.onloadend = () =>{
                fetch(requestURLusers + '/' + JSON.parse(localStorage.meUser).id,{
                    method: "PATCH",
                    body:JSON.stringify({
                        Avatar:reader.result
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }).then(()=>{
                    me.Avatar = reader.result;
                    localStorage.meUser = JSON.stringify(me);
                    booleanInfo = !booleanInfo
                    printAccountInfo(JSON.parse(localStorage.meUser));
                })
            }
            reader.readAsDataURL(fileList[0]);
        })
        document.querySelector('.messenger-user__edit').addEventListener('click',()=>{
            if(document.querySelector('.status-block').contentEditable == "true"){
                document.querySelector('.messenger-user__edit').style.background = 'url("img/manifest/icons/edit.svg") no-repeat center';
                document.querySelector('.status-block').contentEditable = "false";
                me.Status = document.querySelector('.status-block').innerHTML;
                localStorage.meUser = JSON.stringify(me);
                fetch(requestURLusers + "/" + me.id, {
                    method: "PATCH",
                    body: JSON.stringify({
                        Status:document.querySelector('.status-block').innerHTML
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
            }
            else{
                document.querySelector('.messenger-user__edit').style.background = 'url("img/manifest/icons/apply.svg") no-repeat center';
                document.querySelector('.status-block').contentEditable = "true";
            }

        })
    }
    else if(booleanInfo == false){
        document.querySelector('.messenger-user__photo').innerHTML =
            '<div class="messenger-user__photo--container"><img src="'+obj.Avatar+'" alt="user" class="messenger-user__photo">' +
            ' <label class="messenger-user__btn" for="image__upload"></label> <input id="image__upload" type="file" accept=".png, .jpg, .jpeg" class="messenger-user__input-upload">'

        html = "<span class='messenger-user__username'>" + obj.Login + "</span>"
        html += "<span id='name-text' class='messenger-user__username-text'>@" + obj.Login + "</span>"
        document.querySelector('.messenger-user__username-block').innerHTML = html;
        document.querySelector('.messenger-user__person').innerHTML =
            '<h2 id="name" class="messenger-user__name">' +obj.Login +'</h2>' +
            '<span class="messenger-user__status">Status</span>' +
            '</div><div class="status-block">'+obj.Status+'</div>'
        document.querySelector('.messenger-user__username-block-email').innerHTML =
            '<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">' + obj.Email + '</span>';
        document.querySelector('.messenger-user__btn--cont').innerHTML = ''
        booleanInfo = !booleanInfo;
    }
}
function printFriend() {
    let html = "<h2 class=\"messenger-nav-2__title\">friends</h2>";
    document.querySelector('.messenger-nav-2__friends').innerHTML = html;
    if(JSON.parse(localStorage.meUser).Friends.length == 0){
        document.querySelector('.messenger-nav-2__friends').innerHTML = html;
    }
    for (let i = 0; i < UsersMy.length; i++) {
        if(UsersMy[i].id !== JSON.parse(localStorage.meUser).id){
                html = ''
                html += '<ul class="messenger-nav-2__friends-list ulres"><li class="messenger-nav-2__friend" id="messenger-nav-2__friend'+UsersMy[i].id+'"><a href="#">'
                html += '<img src="img/manifest/messenger/user.png" alt="user"><h2 class="messenger-nav-2__friend--user">' + UsersMy[i].Login + '</h2><span class="message-number message-number'+UsersMy[i].id+'"></span></a></li></ul>'
                document.querySelector('.messenger-nav-2__friends').insertAdjacentHTML('beforeend',html)
                document.getElementById('messenger-nav-2__friend'+UsersMy[i].id).addEventListener('click',()=>{
                    printChat(UsersMy[i].id)
                });
        }
    }
}
function printChat(userID) {
    localStorage.toUser = userID;
    let obj;
    let user;
    let myObject = JSON.parse(localStorage.meUser);
    for (let i = 0; i < myObject.Friends.length; i++) {
        if (myObject.Friends[i].Id === userID) {
            for (let j = 0; j < UsersMy.length; j++) {
                if (UsersMy[j].id === userID) {
                    obj = UsersMy[j];
                }
            }
            user = myObject.Friends[i]
        }
    }
    let html = ``;
    let message;
    if(UserId == -1 || myObject.Friends.length == 0){
        html  += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">None</span>`
        message = 'Заведи сначала друзей)'
        user = -1;
    }
    else{
        message = printMessages(myObject, obj)
        html  += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">`+obj.Login+`</span>`
    }
    let count;
    if(document.querySelector('.messenger-main__notification-list')){
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
    myObject.Friends.forEach(friend=>{
        if(count > 0){
            if(friend.Id !== user.Id){
                printNotification(0,friend);
            }
        }
    })
    printNotification(-1,user);
    document.querySelector('.messenger-main__notification').addEventListener('click',()=>{
        if(document.querySelector('.messenger-main__notification-list').style.display == 'flex'){
            document.querySelector('.messenger-main__notification-list').style.display = 'none';
            setTimeout(()=>{
                document.querySelector('.messenger-main__notification-list').style.width = '0';
                document.querySelector('.messenger-main__notification-list').style.height = '0';
            },1)

        }
        else{
            document.querySelector('.messenger-main__notification-list').style.display = 'flex';
            setTimeout(()=>{
                document.querySelector('.messenger-main__notification-list').style.width = '250px';
                document.querySelector('.messenger-main__notification-list').style.height = '100px';
            },1)


        }

    })
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
    if (obj.Friends.length == 0) {
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
                    location.href = '../messenger.html';
                    return;
                }
            }
            alert("Нет такого пользователя")
        })
    })
}