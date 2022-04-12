let endReg = true;
document.querySelector('.register-main__btn').addEventListener('click', (e) => {
    e.preventDefault()
    let loginValue = document.getElementById('name').value;
    let passwordValue = document.getElementById('password').value;
    let emailValue = document.getElementById('email').value;
    if (passwordValue.length < 8) {
        alert("слишком короткий пароль");
        return;
    }
    if(endReg){
        endReg = false;
        sendRequest(requestURLusers).then(Users => {
            for(let i = 0; i< Users.length; i++){
                if ((Users[i].Login === loginValue) || (Users[i].Email === emailValue)) {
                    alert("Такой логин или почта уже есть");
                    return;
                }
            }
            let obj = new User(loginValue, passwordValue, emailValue);
            UsersMy.push(obj);
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
    e.preventDefault();
    let loginValue = document.getElementById('name').value;
    let passwordValue = document.getElementById('password').value;
    let emailValue = document.getElementById('email').value;
    if (passwordValue.length < 8) {
        alert("слишком короткий пароль");
        return;
    }
    if(endReg){
        sendRequest(requestURLusers).then(Users => {
            for (let i = 0; i < Users.length; i++) {
                if ((Users[i].Login === loginValue) || (Users[i].Email === emailValue)) {
                    alert("Такой логин или почта уже есть");
                    return;
                }
            }
            let obj = new User(loginValue, passwordValue, emailValue);
            UsersMy.push(obj);
            infoCheck(obj);
            localStorage.clear();
            localStorage.setItem('meUser', JSON.stringify(obj));
            sendRequestPost("POST", requestURLusers,obj);
            location.href = './messenger.html';
        })
    }

})