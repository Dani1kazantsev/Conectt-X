
(function (){
    if(localStorage.meUser === undefined){
        const User = {
            login:'Guest',
            password:'1234',
            email:'123@inbox.ru'
        }
        localStorage.setItem('meUser',JSON.stringify(User))
    }
})