const popupLinks = document.querySelectorAll('.popup_link')
const closePopups = document.querySelectorAll('.close-popup')
popupLinks.forEach(link=>{
    link.addEventListener('click',(e)=>{
        const popup = document.getElementById(link.getAttribute('href').replace('#',''))
        showPopup(popup)
        e.preventDefault()
    })
})
closePopups.forEach(closeLink=>{
    closeLink.addEventListener('click',(e)=>{
        hidePopup(closeLink.closest('.popup'))
        e.preventDefault()
    })
})
function showPopup(popup){
    if(popup){
        const openedPopup = document.querySelector('.popup.open')
        if(openedPopup){
            hidePopup(openedPopup)
        }
        popup.classList.add('open')
        popup.addEventListener('click',(e)=>{
            if(!e.target.closest('.server-popup__content')){
                hidePopup(e.target.closest('.popup'))
            }
        })
    }
}
function hidePopup(popup,doUnlock = true){
    popup.classList.remove('open')
}