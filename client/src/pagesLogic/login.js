let loginForm = document.forms['loginForm']
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let emailValue = loginForm.elements.email.value
    let passwordValue = loginForm.elements.password.value
    axios.post('/auth/login',{
        email:emailValue,
        password:passwordValue
    },{withCredentials:true,baseURL:API_URL,}).then(response=>{
        localStorage.setItem('token',response.data)
        myAxios.get(`users/me${jwt_decode(response.data).id}`).then(res=>{
            localStorage.setItem('me',JSON.stringify(res.data))
            location.href = 'messenger.html'
        }).catch(err=>{

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
        baseURL:API_URL ,
    }).then(response=>{
        localStorage.setItem('token',response.data)
        myAxios.get(`users/me${jwt_decode(response.data).id}`).then(res=>{
            localStorage.setItem('me',JSON.stringify(res.data))
            location.href = 'messenger.html'
        })
    }).catch(err=>{
        document.querySelector('.error').classList.remove('none')
        document.querySelector('.error__message').textContent = err.response.data.message
    })
})
loginForm.elements.email.addEventListener('keydown',()=>{
    document.querySelector('.error').classList.add('none')
})
loginForm.elements.password.addEventListener('keydown',()=>{
    document.querySelector('.error').classList.add('none')
})