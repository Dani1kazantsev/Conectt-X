function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};
let form = document.forms['register-form']
form.elements.button.addEventListener('click', (e) => {
    e.preventDefault()
    let loginValue = form.elements.login.value;
    let passwordValue = form.elements.password.value;
    let emailValue = form.elements.email.value;
    if (passwordValue.length < 6) {
        alert("слишком короткий пароль");
        return;
    }

    axios.post('/auth/registration', {
        login: loginValue,
        email: emailValue,
        password: passwordValue,
        avatar: 'asd'
    }, {withCredentials: true, baseURL: "http://localhost:5000",}).then(response => {
        localStorage.setItem('token', response.data)
        myAxios.get(`users/me${parseJwt(response.data).id}`).then(res => {
            localStorage.setItem('me', JSON.stringify(res.data))
            location.href = 'messenger.html'
        })
    })


})
form.addEventListener('submit', (e) => {
    e.preventDefault()
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
        avatar: 'asd'
    }, {withCredentials: true, baseURL: "http://localhost:5000",}).then(response => {
        localStorage.setItem('token', response.data)

        myAxios.get(`users/me${parseJwt(response.data).id}`).then(res => {
            localStorage.setItem('me', JSON.stringify(res.data))
            location.href = 'messenger.html'
        })
    })
})