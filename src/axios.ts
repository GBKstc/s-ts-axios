import {AxiosInstance, AxiosMethodRequestConfig} from "./types";
import Axios from "./core/Axios";
import {extend} from "./helpers/util";
import defaults from "./defaultes";

function getAxios(config: AxiosMethodRequestConfig): AxiosInstance {
    const context = new Axios(config);
    const axios = Axios.prototype.request.bind(context) as AxiosInstance;
    // 挂载接口
    // axios.get = Axios.prototype.get.bind(context);
    //...
    extend(axios, context);

    return axios as AxiosInstance;
}

const axios = getAxios(defaults);

export default axios;