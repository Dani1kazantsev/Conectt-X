//<span class="messenger-user__username">Username</span>
//<span id="name-text" class="messenger-user__username-text">@user</span>
sendRequest(requestURLusers).then(prototypeFunctions()).then(data =>{
    for (let i = 0; i < data.length; i++) {
        allUsers.push(data[i])
    }
    for (let i = 0; i < data.length; i++) {
        if(data[i].Login == JSON.parse(localStorage.meUser).Login){
            var me = data[i];
            UserId = JSON.parse(localStorage.meUser).id
            localStorage.meUser = JSON.stringify(data[i])
        }
    }
    printAccountInfo(me);
    printFriend(me);
    printChat(me.Friends[0]);
    printMessages(me,me.Friends[0])
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

    #GetSimilarityCount() {
        let index = 0;
        for (
            let i = 0;
            i < this.Target.length || i < this.Input.length;
            i++
        ) {
            if (this.Target[i] == this.Input[i]) {
                index++;
            }
        }

        return index;
    }

    #IsSubString() {
        let str =
            this.Target.length >= this.Input.length
                ? this.Target
                : this.Input;
        let substr =
            this.Target.length < this.Input.length
                ? this.Target
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
            this.Target.length >= this.Input.length
                ? this.Target.length
                : this.Input.length;
        let cur = this.#GetSimilarityCount();
        let count = cur / max;

        let isSub = this.#IsSubString() ? 1 : 0;

        let inputcount = this.#FindSumbolsCount(this.Input);
        let targetcount = this.#FindSumbolsCount(this.Target);

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
            ? this.Target 
            : "";
    }
}

var words = [];
let h1 = document.querySelector('.messenger-nav-2__user1');
let h2 = document.querySelector('.messenger-nav-2__user2');
let h3 = document.querySelector('.messenger-nav-2__user3');
let textarea = document.querySelector('.messenger-nav-2__search-input');
document.querySelector('.messenger-nav-2__search-input').onkeyup = changed;
h1.onclick = clicked;
h2.onclick = clicked;
h3.onclick = clicked;

function changed() {
    results = [];
    words = textarea.value.split(" ");
    sendRequest(requestURLusers).then(data=>{
        data.forEach((f) => {
            results.push(
                new Result(words[words.length - 1].toLowerCase(), f.Login)
            );
        });
    
        results = results.sort((a, b) => {
            return a.IndexOfSimilarity > b.IndexOfSimilarity ? -1 : 1;
        });
    
        h1.innerHTML = results[0].ToString();
        h2.innerHTML = results[1].ToString();
        h3.innerHTML = results[2].ToString();
    })
}

function clicked() {
    word = this.innerHTML.split("<br>")[0];
    words[words.length - 1] = word;
    input.value = "";
    words.forEach((f) => (input.value += f + " "));

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    changed();
}
