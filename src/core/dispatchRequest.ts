import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types'
import xhr from './xhr'
import transform from './transform'
import {bulidURL} from "../helpers/url";
import {transformRequest} from "../helpers/data";
import {processHeaders, transformResponse, flattenHeaders} from "../helpers/headers";

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponseData(res);
    })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    // config.headers = transformHeader(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeaders(config.headers, config.method!);
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

function transformResponseData(res: AxiosResponse): any {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}

export default dispatchRequest