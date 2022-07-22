import axios from "../../src";

axios({
    method: "post",
    url: '/api/getResponse',
    data: {
        a: 1,
        b: 2
    }
}).then((res) => {
    console.log(res)
})

axios({
    method: "post",
    url: "/api/getResponse",
    responseType: "json",
    data: {
        a: 1,
        b: 2
    }
}).then((res) => {
    console.log(res)
})