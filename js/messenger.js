//<span class="messenger-user__username">Username</span>
//<span id="name-text" class="messenger-user__username-text">@user</span>
sendRequest(requestURLusers).then(prototypeFunctions()).then(data =>{
    for (let i = 0; i < data.length; i++) {
        allUsers.push(data[i])
    }
    for (let i = 0; i < data.length; i++) {
        if(data[i].Login == JSON.parse(localStorage.meUser).Login){
            var me = data[i];
            UserId = JSON.parse(localStorage.meUser).id
            localStorage.meUser = JSON.stringify(data[i])
        }
    } 
    printAccountInfo(me);
    printFriend(me);
    printChat(me.Friends[0]);
    printMessages(me,me.Friends[0])
    infoCheck();
})
document.querySelector('.messenger-main__message-text').addEventListener('keypress',e=>{
    if(e.keyCode == 13){
        e.preventDefault()
        
    }
})
