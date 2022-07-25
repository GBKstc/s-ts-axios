import {AxiosInstance} from "./types";
import Axios from "./core/Axios";
import {extend} from "./helpers/util";

function getAxios(): AxiosInstance {
    const context = new Axios();
    const axios = Axios.prototype.request.bind(context) as AxiosInstance;
    // 挂载接口
    // axios.get = Axios.prototype.get.bind(context);
    // axios.delete = Axios.prototype.delete.bind(context);
    // axios.head = Axios.prototype.head.bind(context);
    // axios.options = Axios.prototype.options.bind(context);
    // axios.post = Axios.prototype.post.bind(context);
    // axios.put = Axios.prototype.put.bind(context);
    // axios.patch = Axios.prototype.patch.bind(context);
    extend(axios, context);

    return axios;
}

const axios = getAxios();

export default axios;