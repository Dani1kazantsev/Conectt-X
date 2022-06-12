function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
};
let loginForm = document.forms['loginForm']
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let emailValue = loginForm.elements.email.value
    let passwordValue = loginForm.elements.password.value
    axios.post('/auth/login',{
        email:emailValue,
        password:passwordValue
    },{withCredentials:true,baseURL:"http://localhost:5000",}).then(response=>{
        localStorage.setItem('token',response.data)
        myAxios.get(`users/me${parseJwt(response.data).id}`).then(res=>{
            localStorage.setItem('me',JSON.stringify(res.data))
            location.href = 'messenger.html'
        })
    })
})
loginForm.elements.button.addEventListener('click',(e)=>{
    e.preventDefault()
    let emailValue = loginForm.elements.email.value
    let passwordValue = loginForm.elements.password.value
    axios.post('/auth/login',{
        email:emailValue,
        password:passwordValue
    },{
        withCredentials:true,
        baseURL:"http://localhost:5000",
    }).then(response=>{
        localStorage.setItem('token',response.data)
        myAxios.get(`users/me${parseJwt(response.data).id}`).then(res=>{
            localStorage.setItem('me',JSON.stringify(res.data))
            location.href = 'messenger.html'
        })
    })
})