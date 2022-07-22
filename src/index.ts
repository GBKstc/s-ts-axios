import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types'
import xhr from './xhr'
import {bulidURL} from "./helpers/url";
import {transformRequest} from "./helpers/data";
import {processHeaders, transformResponse} from "./helpers/headers";

function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res);
    })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers = transformHeader(config);
    config.data = transformRequestData(config)
}

function transformRequestData(config: AxiosRequestConfig): any {
    const {data} = config
    return transformRequest(data)
}

function transformUrl(config: AxiosRequestConfig): string {
    const {url, params} = config
    return bulidURL(url, params);
}

function transformHeader(config: AxiosRequestConfig): string {
    const {headers, data} = config
    return processHeaders(headers, data);
}

function transformResponseData(config: AxiosResponse): any {
    const {data} = config
    return transformResponse(data)
}

export default axios