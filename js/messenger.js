prototypeFunctions()
let Emoji
sendRequest('https://conectt.herokuapp.com/images').then(data=>{
    Emoji = data;
});
sendRequest(requestURLusers).then(data => {
    data.forEach(user=>{
        if (user.id == JSON.parse(localStorage.meUser).id) {
            localStorage.meUser = JSON.stringify(user)
            UsersMy.push(JSON.parse(localStorage.meUser))
            for (let i = 0; i < user.Friends.length; i++) {
                for (let j = 0; j < data.length; j++){
                    if(data[j].id === user.Friends[i]){
                        UsersMy.push(data[j])
                    }
                }
            }
        }
    })
    for (let i = 0; i < data.length; i++) {
        if (data[i].Login == JSON.parse(localStorage.meUser).Login) {
            var me = data[i];;
            UserId = JSON.parse(localStorage.meUser).id;
        }
    }
    printAccountInfo(me);
    printFriend();
    printChat(me.Friends[0]);
    printMessages(me, me.Friends[0])
    infoCheck();
})

var results = [];

class Result {
    Input = "";
    Target = "";
    #IndexOfSimilarity = -1;

    get IndexOfSimilarity() {
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
            let i = 0;i < max; i++) {
            if (this.Target.Login[i] == this.Input[i]){
                index++;
            }
        }

        return index;
    }

    #IsSubString() {
        let str =
            this.Target.Login.length >= this.Input.length
                ? this.Target.Login
                : this.Input;
        let substr =
            this.Target.Login.length < this.Input.length
                ? this.Target.Login
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
            this.Target.Login.length >= this.Input.length
                ? this.Target.Login.length
                : this.Input.length;
        let cur = this.#GetSimilarityCount(max);
        let count = cur / max;

        let isSub = this.#IsSubString() ? 1 : 0;

        let inputcount = this.#FindSumbolsCount(this.Input);
        let targetcount = this.#FindSumbolsCount(this.Target.Login);

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
            ? `<span class="cursor" onclick="addFriend(`+this.Target.id+`)">`+this.Target.Login+`</span>`
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
    sendRequest(requestURLusers).then(data => {
        results = [];
        words = textarea.value.split(" ");
        data.forEach((f) => {
            if(f.id != JSON.parse(localStorage.meUser).id){
                results.push(
                    new Result(words[words.length - 1].toLowerCase(), f)
                );
            }

        });

        results = results.sort((a, b) => {
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
        h2.innerHTML = results[1].ToString();

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




