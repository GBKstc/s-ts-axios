import {AxiosPromise, AxiosRequestConfig, AxiosMethodRequestConfig, Method} from "../types";
import dispatchRequest from "./dispatchRequest";

export default class Axios {
    request(config: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(config)
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this.request(
            Object.assign(config || {}, {method: method, url})
        )
    }

    _requestMethodWithData(method: Method, url: string, date?: any, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this.request(
            Object.assign(config || {}, date, {method: method, url})
        )
    }

    get(url: string, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData("get", url, config)
    }

    delete(url: string, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData("delete", url, config)
    }

    head(url: string, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData("head", url, config)
    }

    options(url: string, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData("options", url, config)
    }

    post(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithData(
            "post",
            url,
            data,
            config
        );
    }

    put(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithData(
            "put",
            url,
            data,
            config
        );
    }

    patch(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this._requestMethodWithData(
            "patch",
            url,
            data,
            config
        );
    }
}