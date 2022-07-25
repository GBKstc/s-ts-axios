import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import {parseHeaders} from "../helpers/headers"
import {createError} from "../helpers/error"

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {data = null, url, method = 'get', headers = {}, responseType, timeout} = config;
        // 1.创建XMLHttpRequest异步对象
        const request = new XMLHttpRequest()
        // 2.配置请求参数
        request.open(method.toUpperCase(), url, true)
        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            }
            request.setRequestHeader(name, headers[name])
        })
        if (responseType) {
            request.responseType = responseType;
        }
        if (timeout) {
            request.timeout = timeout;
        }
        // 3.发送请求
        request.send(data)
        // 4.注册事件，拿到响应信息
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 0) {
                return;
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
            const responseData =
                responseType && responseType !== "text"
                    ? request.response
                    : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };

            function handleResponse(response: AxiosResponse): void {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response);
                } else {
                    reject(createError(`Request failed with status code ${response.status}`, config, request));
                }
            }

            handleResponse(response);
        }
        // 4.1 网络错误事件
        request.onerror = function () {
            reject(createError("Net Error", config, request));
        };
        // 4.2 超时错误事件
        request.ontimeout = function () {
            reject(createError(`Timeout of ${timeout} ms exceeded`, config, request));
        };
    });
}