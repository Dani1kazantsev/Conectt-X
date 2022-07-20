let once = true
let form = document.forms['register-form']
form.elements.login.addEventListener('keydown', () => {
    document.querySelector('.error').classList.add('none')
})
form.elements.email.addEventListener('keydown', () => {
    document.querySelector('.error').classList.add('none')
})

form.elements.button.addEventListener('click', (e) => {
    e.preventDefault()
    if (once) {
        once = false;
        let loginValue = form.elements.login.value;
        let passwordValue = form.elements.password.value;
        let emailValue = form.elements.email.value;
        if (loginValue.length == 0) {
            alert('Нужно заполнить логин')
        }

        axios.post('/auth/registration', {
            login: loginValue,
            email: emailValue,
            password: passwordValue,
        }, {withCredentials: true, baseURL: API_URL,})
            .then(response => {
                if(response.data.status >= 400){
                    alert(response.data.message)
                    once = true;
                    return
                }
                localStorage.setItem('token', response.data)
                myAxios.get(`users/me${jwt_decode(response.data).id}`).then(res => {
                    localStorage.setItem('me', JSON.stringify(res.data))
                    once = true
                    location.href = 'messenger.html'
                })
            })
    }
})
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (once) {
        once = false;
        let loginValue = form.elements.login.value;
        let passwordValue = form.elements.password.value;
        let emailValue = form.elements.email.value;
        if (passwordValue.length < 6) {
            alert("слишком короткий пароль");
            return;
        }

        axios.post('auth/registration', {
            login: loginValue,
            email: emailValue,
            password: passwordValue,
        }, {withCredentials: true, baseURL: API_URL,}).then(response => {
            if(response.data.status >= 400){
                alert(response.data.message)
                once = true;
                return
            }
            localStorage.setItem('token', response.data)
            location.href = 'login.html'
            myAxios.get(`users/me${jwt_decode(response.data).id}`).then(res => {
                localStorage.setItem('me', JSON.stringify(res.data))
                once = true;
                location.href = 'messenger.html'
            })
        })
    }

})