let me;
let avatarSrc = `../serv/clientFiles/images/avatars/`
myAxios.get(`users/me${JSON.parse(localStorage.getItem('me')).id}`).then((res)=>{
    me = res.data
    me.avatar = `../serv/clientFiles/images/avatars/${me.avatar}`
    printAccountInfo(me);
})

function printChat(userID) {
    let obj;
    let user;
    let html = ``;
    let message;
    if(userID == -1){
        html  += `<div class="messenger-main__header"><div class="messenger-main__chat-preview"><span class="messenger-main__name">None</span>`
        message = 'Заведи сначала друзей)'
    }


    html += `<button class="messenger-main__favorite"></button><button class="messenger-main__delete"></button></div>
    <div class="messenger-main__settings"><div class="messenger-nav-2__search">
    <input type="text" class="messenger-nav-2__search-input" autocomplete="none" placeholder="Search..."><button class="messenger-nav-2__search-btn"></button></div>
    <div class="messenger-main__notification--block"><ol class="messenger-main__notification-list ulres "></ol><button class="messenger-main__notification"></button></div><button class="messenger-main__other"></button></div></div>`

    html += `<div class="messenger-main__chat"><ol class="messenger-main__chat-list ulres">` + message + `</ol></div>`
    html += `<div class="messenger-main__message"><form action="" id="message"><div class="messenger-main__fails">
    <button form="message" class="messenger-main__document"></button><button form="message" class="messenger-main__voice"></button></div>
    <div class="messenger-main__message-text" data-text="Message" contenteditable="true"></div><div class="messenger-main__push-block"><div class="messenger-main__emoji-block">
    <ol class="messenger-main__emoji-list ulres "></ol><button type="button" class="messenger-main__emoji"></button></div></button> 
    <button type="reset" class="messenger-main__push">
    </button></div></form></div></div>`
    document.querySelector('.messenger-main').innerHTML = html;
}
printChat(-1)
function printAccountInfo(obj) {
    if (obj.status == null) {
        obj.status = ''
    }
    document.querySelector('.messenger-user__photo').innerHTML =
        `<div id="UserPhoto" class="messenger-user__photo--container">` +
        `<img src="${obj.avatar}" alt="user" class="messenger-user__photo-img">` +
        ' <label class="messenger-user__btn" for="image__upload"></label> <input id="image__upload" type="file" accept=".png, .jpg, .jpeg" class="messenger-user__input-upload">'
    html = "<span class='messenger-user__username'>" + obj.login + "</span>";
    html += `<span id='name-text' class='messenger-user__username-text'>@${obj.login}</span>`;
    document.querySelector('.messenger-user__username-block').innerHTML = html;
    document.querySelector('.messenger-user__person').innerHTML =
        `<h2 id="name" class="messenger-user__name">${obj.login}</h2>` +
        `<div class="messenger-user__person--edit"><span class="messenger-user__status">Status</span>` +
        `<button type="button" class="messenger-user__edit"></button>` +
        `</div><div class="status-block" contenteditable="false">${obj.status}</div>`
    document.querySelector('.messenger-user__username-block-email').innerHTML =
        `<span class="messenger-user__username">Email</span><span id="email" class="messenger-user__username-text">${obj.email}</span>`;
    document.querySelector('.messenger-user__btn--cont').innerHTML = '<a href="index.html" class="messenger-user__message">Выйти</a>'

    document.getElementById('UserPhoto').addEventListener('mouseenter', () => {
        document.querySelector('.messenger-user__photo--container').classList.add('messenger-user__photo--before');
        document.querySelector('.messenger-user__btn').style.display = 'block';
    })
    document.getElementById('UserPhoto').addEventListener('mouseleave', () => {
        document.querySelector('.messenger-user__photo--container').classList.remove('messenger-user__photo--before')
        document.querySelector('.messenger-user__btn').style.display = 'none';
    })
    document.getElementById('image__upload').addEventListener('change', () => {
        let fileList = document.getElementById('image__upload').files;
        const formData = new FormData()
        formData.append('avatar', fileList[0])
        myAxios.put('/users/avatar',
            formData
        ).then(response=>{
            me.avatar = response.data.avatar
            document.querySelector('.messenger-user__photo-img').src =
                avatarSrc + response.data.avatar
        })
    })
    document.querySelector('.messenger-user__edit').addEventListener('click', () => {
        if (document.querySelector('.status-block').contentEditable == "true") {
            document.querySelector('.messenger-user__edit').style.background = 'url("img/manifest/icons/edit.svg") no-repeat center';
            document.querySelector('.status-block').contentEditable = "false";
            obj.Status = document.querySelector('.status-block').innerHTML;
            localStorage.meUser = JSON.stringify(obj);
            fetch(requestURLusers + "/" + obj.id, {
                method: "PATCH",
                body: JSON.stringify({
                    Status: document.querySelector('.status-block').innerHTML
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        } else {
            document.querySelector('.messenger-user__edit').style.background = 'url("img/manifest/icons/apply.svg") no-repeat center';
            document.querySelector('.status-block').contentEditable = "true";
        }

    })
}

let results = [];

class Result {
    Input = "";
    Target = "";
    #IndexOfSimilarity = -1;

    get IndexOfSimilarity() {
        debugger
        if (this.#IndexOfSimilarity == -1) {
            this.#IndexOfSimilarity = this.#GetIndexOfSimilarity();
        }

        return this.#IndexOfSimilarity;
    }

    constructor(input, target) {
        this.Input = input;
        this.Target = target;
    }

    #FindSumbolsCount(str) {
        let result = [[], []];
        for (let i = 0; i < str.length; i++) {
            let index = result[0].indexOf(str[i]);
            if (index == -1) {
                result[0].push(str[i]);
                result[1].push(1);
            } else {
                result[1][index]++;
            }
        }

        return result;
    }

    #GetSimilarityCount(max) {
        let index = 0;
        for (
            let i = 0; i < max; i++) {
            if (this.Target.login[i] == this.Input[i]) {
                index++;
            }
        }

        return index;
    }

    #IsSubString() {
        let str =
            this.Target.login.length >= this.Input.length
                ? this.Target.login
                : this.Input;
        let substr =
            this.Target.login.length < this.Input.length
                ? this.Target.login
                : this.Input;

        for (let i = 0, k = 0; i < str.length; i++) {
            if (str[i] == substr[k]) {
                if (k == substr.length - 1) {
                    return true;
                }

                k++;
            }
        }

        return false;
    }

    #GetIndexOfSimilarity() {

        let max =
            this.Target.login.length >= this.Input.length
                ? this.Target.login.length
                : this.Input.length;
        let cur = this.#GetSimilarityCount(max);
        let count = cur / max;

        let isSub = this.#IsSubString() ? 1 : 0;

        let inputcount = this.#FindSumbolsCount(this.Input);
        let targetcount = this.#FindSumbolsCount(this.Target.login);

        let prev = targetcount[0].length;

        for (
            let i = 0;
            i < targetcount[0].length && inputcount[0].length > 0;
            i++
        ) {
            let index = inputcount[0].indexOf(targetcount[0][i]);

            if (index != -1) {
                if (targetcount[1][i] > inputcount[1][index]) {
                    targetcount[0][i] -= inputcount[1][index];

                    inputcount[0].splice(index, 1);
                    inputcount[1].splice(index, 1);
                } else if (
                    targetcount[1][i] < inputcount[1][index]
                ) {
                    inputcount[1][index] -= targetcount[1][i];

                    targetcount[0].splice(i, 1);
                    targetcount[1].splice(i, 1);

                    i--;
                } else {
                    inputcount[0].splice(index, 1);
                    inputcount[1].splice(index, 1);

                    targetcount[0].splice(i, 1);
                    targetcount[1].splice(i, 1);

                    i--;
                }
            }
        }

        let left = 1 - targetcount[0].length / prev;

        return (count + isSub + left) / 3;
    }

    ToString() {
        return this.#IndexOfSimilarity > 0
            ? `<span class="cursor" onclick="addFriend(` + this.Target.id + `)">` + this.Target.login + `</span>`
            : "";
    }
}

var words = [];
let h1 = document.querySelector('.messenger-nav-2__user1');
let h2 = document.querySelector('.messenger-nav-2__user2');
let h3 = document.querySelector('.messenger-nav-2__user3');
let textarea = document.querySelector('.messenger-nav-2__search-input');
let searchBlock = document.querySelector('.messenger-nav-2__search-rez')
let searchBtn = document.querySelector('.messenger-nav-2__search-btn')
document.querySelector('.messenger-nav-2__search-input').onkeyup = changed;
h1.onclick = clicked;
h2.onclick = clicked;
h3.onclick = clicked;


function changed() {
    myAxios.get('users').then(response => {
        results = [];
        words = textarea.value.split(" ");
        response.data.forEach((f) => {
            if (f.id != JSON.parse(localStorage.me).id) {
                results.push(
                    new Result(words[words.length - 1].toLowerCase(), f)
                );
            }

        });


        results.sort((a, b) => {
            return a.IndexOfSimilarity > b.IndexOfSimilarity ? -1 : 1;
        });
        if (textarea.value === '') {
            searchBlock.style.display = 'none'
            searchBtn.classList.remove('messenger-nav-2__search-btn--close')
        } else {
            searchBlock.style.display = 'flex'
            searchBtn.classList.add('messenger-nav-2__search-btn--close')
            let searchBtnClose = document.querySelector('.messenger-nav-2__search-btn--close')
            searchBtnClose.addEventListener('click', function () {
                searchBlock.style.display = 'none'
                searchBtn.classList.remove('messenger-nav-2__search-btn--close')
                textarea.value = ''
            })
        }
        h1.innerHTML = results[0].ToString();

    })
}

function clicked() {
    let word = this.innerHTML.split("<br>")[0];
    words[words.length - 1] = word;
    input.value = "";
    words.forEach((f) => (input.value += f + " "));
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    changed();
}




