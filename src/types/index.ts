export interface AxiosTransformer {
    (data: any, headers?: any): any;
}

export interface AxiosMethodRequestConfig {
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    method?: Method;
    auth?: any;
    proxy?: any;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];

    [propName: string]: any;
}

export interface AxiosRequestConfig extends AxiosMethodRequestConfig {
    url: string;
}

export type Method = 'get' | 'GET'
    | 'delete' | 'Delete'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export interface AxiosResponse<T = any> {
    data: T; // 服务端返回的数据
    status: number; // HTTP 状态码
    statusText: string; // 状态消息
    headers: any; // 响应头
    config: AxiosRequestConfig; // 请求配置对象
    request: any; // 请求的 XMLHttpRequest 对象实例
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string | null | number;
    request?: any;
    response?: AxiosResponse;
}

export interface Axios {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };

    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

    get<T = any>(url: string, config?: AxiosMethodRequestConfig): AxiosPromise<T>;

    delete<T = any>(url: string, config?: AxiosMethodRequestConfig): AxiosPromise<T>;

    head<T = any>(url: string, config?: AxiosMethodRequestConfig): AxiosPromise<T>;

    options<T = any>(url: string, config?: AxiosMethodRequestConfig): AxiosPromise<T>;

    // 以下三个与上面三个多了data参数

    post<T = any>(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise<T>

    put<T = any>(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise<T>

    patch<T = any>(url: string, data?: any, config?: AxiosMethodRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

    <T = any>(url: string, config?: AxiosMethodRequestConfig): AxiosPromise<T>
}


//拦截器控制器
export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;

    eject(id: number): void;
}

export interface ResolvedFn<T = any> {
    (val: T): T | Promise<T>
}

export interface RejectedFn {
    (error: any): any
}