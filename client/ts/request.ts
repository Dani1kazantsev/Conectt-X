import axios from "axios";

function sendRequest(url){
    return axios.get(url).then(res=>{
        return res
    });
}
function sendRequestPost(url,body = null){
    return axios.post(url,body).then(res=> {
        return res
    })
}

export {sendRequest,sendRequestPost}