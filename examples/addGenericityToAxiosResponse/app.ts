import axios from "../../src/axios";

interface User {
    name: string;
    age: number;
}

function getUser<T>() {
    return axios<T>("/api/getuser")
        .then(res => res)
        .catch(err => console.error(err));
}

async function userList() {
    const res = await getUser<User>();
    if (res) {
        console.log(res.data.name)
    }
}

userList();