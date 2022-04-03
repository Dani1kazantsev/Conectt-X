document.querySelector('.login-main__btn').addEventListener('click',e=>{
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
