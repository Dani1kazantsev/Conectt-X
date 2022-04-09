let endReg = true;
document.querySelector('.register-main__btn').addEventListener('click', (e) => {
    e.preventDefault()
    if(endReg){
        endReg = false;
        let loginValue = document.getElementById('name').value;
        let passwordValue = document.getElementById('password').value;
        let emailValue = document.getElementById('email').value;
        if (passwordValue.length < 8) {
            alert("слишком короткий пароль");
            return;
        }
        sendRequest(requestURLusers).then(Users => {
            for(let i = 0;i< Users.length;i++){
                if ((Users[i].Login === loginValue) || (Users[i].Email === emailValue)) {
                    alert("Такой логин или почта уже есть");
                    return;
                }
            }
            let obj = new User(loginValue, passwordValue, emailValue);
            allMyFriends.push(obj);
            infoCheck(obj);
            localStorage.clear()
            localStorage.setItem('meUser', JSON.stringify(obj))
            sendRequestPost("POST", requestURLusers, new User(loginValue, passwordValue, emailValue)).then(() => {
                endReg = true;
                location.href = './messenger.html';
            })
        })
    }

})
document.querySelector('.register__form').addEventListener('submit', (e) => {
    e.preventDefault()
    if(endReg){
        let loginValue = document.getElementById('name').value;
        let passwordValue = document.getElementById('password').value;
        let emailValue = document.getElementById('email').value;
        if (passwordValue.length < 8) {
            alert("слишком короткий пароль");
            return;
        }
        sendRequest(requestURLusers).then(Users => {
            for (let i = 0; i < Users.length; i++) {
                if ((Users[i].Login === loginValue) || (Users[i].Email === emailValue)) {
                    alert("Такой логин или почта уже есть");
                    return;
                }
            }
            let obj = new User(loginValue, passwordValue, emailValue);
            allMyFriends.push(obj);
            infoCheck(obj);
            localStorage.clear();
            localStorage.setItem('meUser', JSON.stringify(obj));
            sendRequestPost("POST", requestURLusers,obj);
            location.href = './messenger.html';
        })
    }

})