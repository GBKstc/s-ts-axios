export interface AxiosMethodRequestConfig {
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
}

export interface AxiosRequestConfig extends AxiosMethodRequestConfig {
    url: string;
    method?: Method;
}

export type Method = 'get' | 'GET'
    | 'delete' | 'Delete'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export interface AxiosResponse {
    data: any; // 服务端返回的数据
    status: number; // HTTP 状态码
    statusText: string; // 状态消息
    headers: any; // 响应头
    config: AxiosRequestConfig; // 请求配置对象
    request: any; // 请求的 XMLHttpRequest 对象实例
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}

export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string | null | number;
    request?: any;
    response?: AxiosResponse;
}

export interface Axios {

    request(config: AxiosRequestConfig): AxiosPromise;

    get(url: string, config?: AxiosMethodRequestConfig): AxiosPromise;

    delete(url: string, config?: AxiosMethodRequestConfig): AxiosPromise;

    head(url: string, config?: AxiosMethodRequestConfig): AxiosPromise;

    options(url: string, config?: AxiosMethodRequestConfig): AxiosPromise;

    // 以下三个与上面三个多了data参数

    post(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise

    put(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise

    patch(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise
}