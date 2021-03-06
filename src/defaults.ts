import {AxiosMethodRequestConfig} from "./types";
import {processHeaders, transformResponse} from "./helpers/headers";
import {transformRequest} from "./helpers/data";

const defaults: AxiosMethodRequestConfig = {
    timeout: 0,
    headers: {
        common: {
            Accept: "application/json, text/plain, */*"
        }
    },
    transformRequest: [
        function (data: any, headers: any): any {
            processHeaders(headers, data);
            return transformRequest(data);
        },
    ],
    transformResponse: [
        function (data: any, headers: any): any {
            processHeaders(headers, data);
            return transformResponse(data);
        },
    ]
};

const methodsNoData = ["delete", "get", "head", "options"];

methodsNoData.forEach(method => {
    defaults.headers[method] = {};
});

const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach(method => {
    defaults.headers[method] = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
});
export default defaults;