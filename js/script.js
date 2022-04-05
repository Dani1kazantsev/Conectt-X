const requestURLusers = "https://conectt.herokuapp.com/users";
const requestURLMessages = "https://conectt.herokuapp.com/messages";
let UserId = -1;
let allUsers = [];
localStorage.setItem('toUser',-1)
class User{
    Login = "";
    Email = "";
    Password = "";
    Messages = [];
    Friends = [];
    constructor(login,password,email){
        this.Login = login;
        this.Password = password;
        this.Email = email;
    }
}
class Messages{
    FromUserId = 0;
    ToUserId = 0;
    Message = "";
    constructor(fromuserid,touserid,message){
        this.FromUserId = fromuserid;
        this.ToUserId = touserid;
        this.Message = message;
    }
}
function sendRequest(url,method){
    const headers = {
        'Content-Type':'application/json'
    }
    return fetch(url).then(response =>{
        return response.json();
    })   
}
function sendRequestPost(method,url,body = null){
    const headers = {
        'Content-Type':'application/json'
    }
        return fetch(url,{
            method:method,
            headers:headers,
            body:JSON.stringify(body),
            credentials: 'include'
        })
} 
function addFriend(id){
    let myid = JSON.parse(localStorage.meUser).id;
    let myFriends;
    let friendFriends;
    sendRequest(requestURLusers).then(data=>{
        for (let i = 0; i < data.length; i++) {
            if(data[i].id == myid){
                myFriends = data[i].Friends;
            }
            if(data[i].id == id){
                friendFriends = data[i].Friends;
            }
        }
    }).then(e=>{
        for (let i = 0; i < myFriends.length; i++) {
            if(myFriends.id == id){
                return;
            }
        }
        for (let i = 0; i < allUsers.length; i++) {
            if(allUsers[i].id == id){
                myFriends.push(allUsers[i].id)
            }
            if(allUsers[i].id == myid){
                friendFriends.push(allUsers[i].id)
            }
        }
    }).then(e=>{
        fetch(requestURLusers +"/"+myid,{
            method:"PATCH",
            body:JSON.stringify({
                Friends:myFriends
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            }
        })
        fetch(requestURLusers +"/"+id,{
            method:"PATCH",
            body:JSON.stringify({
                Friends:friendFriends
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            }
        })
    })
}
function infoCheck(){  
        let meObj = JSON.parse(localStorage.meUser)
        setInterval(function(){
        sendRequest(requestURLusers).then(data =>{
            let fromUser;
            data.forEach(user => {
                if(user.id == localStorage.toUser){
                    fromUser = user;
                }
            });     
            for (let i = 0; i < data.length; i++) {
                if(meObj.id == data[i].id){
                    if(meObj.Messages.length <  data[i].Messages.length){
                        let allMessages = data[i].Messages;
                        meObj.Messages = allMessages;
                        for (let j = 0; j < data[i].Messages.length; j++) {
                            if((data[i].Messages[j].FromUserId == localStorage.toUser)&&(data[i].Messages[j].ToUserId == meObj.id)||(data[i].Messages[j].FromUserId == meObj.id)&&(data[i].Messages[j].ToUserId == localStorage.toUser)){
                                let html = printMessages(meObj,fromUser);
                                document.querySelector('.messenger-main__chat-list').innerHTML = html
                            }
                        }
                    }
                }
                
            }
        })
    }, 1000);
}
function prototypeFunctions(){
    Object.prototype.printMessagesClass = function(fromObj){
        let html = "";
        for (let i = 0; i < this.Messages.length; i++){
            if((this.Messages[i].FromUserId == fromObj.id)||(this.Messages[i].ToUserId == fromObj.id)){
                if(this.Messages[i].FromUserId == fromObj.id){
                    html += "<div class='message-from'><p>"+this.Messages[i].Message+"</p></div>";
                }
                if(this.Messages[i].ToUserId == fromObj.id){
                    html += "<div class='message-to'><p>"+this.Messages[i].Message+"</p></div>";
                }
            }
        }
        return html;
    }
}
function printAccountInfo(obj){
    html = "<span class='messenger-user__username'>"+obj.Login+"</span>"
    html += "<span id='name-text' class='messenger-user__username-text'>@"+obj.Login+"</span>"
    document.querySelector('.messenger-user__username-block').insertAdjacentHTML("afterbegin",html)
    document.querySelector('.messenger-user__person').insertAdjacentHTML("afterbegin",('<h2 id="name" class="messenger-user__name">'+obj.Login+'</h2>'))
    document.querySelector('.messenger-user__username-block-email').insertAdjacentHTML("beforeend",('<span id="email" class="messenger-user__username-text">'+obj.Email+'</span>'))
}
function printFriend(obj){
    let html = ""
    for (let i = 0; i < obj.Friends.length; i++) {
        for (let j = 0; j < allUsers.length; j++) {
            if(allUsers[j].id == obj.Friends[i]){
                html +='<ul class="messenger-nav-2__friends-list ulres"><li class="messenger-nav-2__friend" onclick="printChat('+allUsers[j].id+')"><a href="#">'
                html += '<img src="./img/manifest/messenger/user.png" alt="user">'+allUsers[j].Login+'</a</li></ul>'
                break
            }
        }
    }
    document.querySelector('.messenger-nav-2__friends').insertAdjacentHTML('beforeend',html)
}
function printChat(userID){
    localStorage.toUser = userID;
    let myObject = JSON.parse(localStorage.meUser)
    if(myObject.Friends.length == 0){
        return
    }
    for (let i = 0; i < myObject.Friends.length; i++){
        if(myObject.Friends[i] == userID){
            for (let j = 0;j < allUsers.length; j++){
                if(allUsers[j].id == userID){
                    var obj = allUsers[j]
                }            
            }
        }
        
    }
    let message = printMessages(myObject,obj)
    let html = `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">`+obj.Login+`</span>
    <button class="messenger-main__favorite"></button></div>
    <div class="messenger-main__settings"><div class="messenger-nav-2__search">
    <input type="text" class="messenger-nav-2__search-input" autocomplete="none" placeholder="Search..."><button class="messenger-nav-2__search-btn"></button></div>
    <button class="messenger-main__notification"></button>  <button class="messenger-main__other"></button></div></div>`

    html += `<div class="messenger-main__chat"><ol class="messenger-main__chat-list ulres">`+message+`</ol></div>`
    html += `<div class="messenger-main__message"><form action="" id="message"><div class="messenger-main__fails">
    <button form="message" class="messenger-main__document"></button><button form="message" class="messenger-main__voice"></button></div>
    <textarea class="messenger-main__message-text" form="message" placeholder="Message"></textarea><button type="button" class="messenger-main__push"onclick='sendMessage(`+obj.id+`)'>
    </button></form></div></div>`
    document.querySelector('.messenger-main').innerHTML = html
}
function printMessages(obj,fromObj){
    if(obj.Friends.length == 0){
        return
    }
    if(typeof fromObj == 'number'){
        for (let i = 0; i < allUsers.length; i++) {
            if(allUsers[i].id == fromObj){
                fromObj = allUsers[i]
            }      
        }
    }
    let html =  obj.printMessagesClass(fromObj);
    return html;
}
function sendMessage(touserid){
    let me = JSON.parse(localStorage.meUser).id
    let msg = document.querySelector('.messenger-main__message-text').value;
    if(msg == ""){
        return
    }
    msg = new Messages(me,touserid,msg)
    let MessagesAll = []
    MessagesAll.push(msg)
    sendRequest(requestURLusers).then(data =>{
        for (let i = 0; i < data.length; i++) {
            if(data[i].id == touserid){
                for (let j = 0; j < data[i].Messages.length; j++) {
                        MessagesAll.push(data[i].Messages[j])
                }
            }
        }
    }).then(e=>{
        fetch(requestURLusers +"/"+touserid,{
            method:"PATCH",
            body:JSON.stringify({
                Messages:MessagesAll
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            }
        })
        fetch(requestURLusers +"/"+me,{
            method:"PATCH",
            body:JSON.stringify({
                Messages:MessagesAll
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            }
        })
    })
    console.log(JSON.parse(localStorage.meUser))
    sendRequestPost("POST",requestURLMessages,msg)
}
//register.js
if(document.querySelector('.register-main__btn')){
    document.querySelector('.register-main__btn').addEventListener('click',e=>{
        let loginValue = document.getElementById('name').value;
        let passwordValue = document.getElementById('password').value;
        let emailValue = document.getElementById('email').value;
        if(passwordValue.length < 8){
            alert("слишком короткий пароль");
            return;
        }
        sendRequest(requestURLusers).then(Users =>{
            for(let i = 0; i < Users.length; i++) {
                if((Users[i].Login == loginValue)||(Users[i].Email == emailValue)){
                    alert("Такой логин или почта уже есть");
                    return;
                }
            }
            let obj = new User(loginValue,passwordValue,emailValue);
            printUser(obj);
            allUsers.push(obj);
            infoCheck(obj);
            sendRequestPost("POST",requestURLusers,new User(loginValue,passwordValue,emailValue)).then(()=>{
                location.href = '../messenger.html';
            })
        })
    })
}

//login.js
if(document.querySelector('.login-main__form') ){
    document.querySelector('.login-main__form').addEventListener('submit',function(e){
        e.preventDefault()
        let emailValue = document.forms[0].elements.email.value;
        let passwordValue = document.forms[0].elements.password.value;
        sendRequest(requestURLusers).then(Users =>{
            for(let i = 0; i < Users.length; i++) {
                if((Users[i].Password == passwordValue)&&(Users[i].Email == emailValue)){
                    UserId = Users[i].id
                    localStorage.clear()
                    localStorage.setItem('meUser',JSON.stringify(Users[i]));
                    location.href = './messenger.html'
                    return;
                }
            }
            alert("Нет такого пользователя")
        })
    })
}

