import {
    AxiosPromise,
    AxiosResponse,
    AxiosRequestConfig,
    AxiosMethodRequestConfig,
    Method,
    ResolvedFn,
    RejectedFn
} from "../types";
import dispatchRequest from "./dispatchRequest";
import {InterceptorManager} from "./InterceptorManager";
import mergeConfig from "./mergeConfig";

interface PromiseArr<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
    rejected?: RejectedFn;
}

export default class Axios {
    defaults: AxiosMethodRequestConfig;
    private interceptors: {
        request: InterceptorManager<AxiosRequestConfig>;
        response: InterceptorManager<AxiosResponse<any>>
    }

    constructor(defaultConfig: AxiosMethodRequestConfig) {
        this.defaults = defaultConfig;
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        };
    }

    request(url: any, config?: any): AxiosPromise {
        if (typeof url === "string") {
            if (!config) {
                config = {}
            }
            config.url = url;
        } else {
            config = url;
        }
        config = mergeConfig(this.defaults, config);
        let arr: PromiseArr<any>[] = [
            {
                resolved: dispatchRequest,
                rejected: undefined
            }
        ];
        this.interceptors.request.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                arr.unshift(interceptor);
            }
        });
        this.interceptors.response.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                arr.push(interceptor);
            }
        });
        let promise = Promise.resolve(config);
        while (arr.length) {
            const {resolved, rejected} = arr.shift()!;
            promise = promise.then(resolved, rejected);
        }
        return dispatchRequest(config)
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {method: method, url}))
    }

    _requestMethodWithData(method: Method, url: string, date?: any, config?: AxiosMethodRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, date, {method: method, url}))
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
        console.log(url, data, config);
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