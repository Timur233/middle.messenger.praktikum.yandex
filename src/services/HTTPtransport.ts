import HTTPResponse from './HTTPResponse.ts';

/* eslint-disable no-unused-vars, no-shadow */
enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}
/* eslint-enable no-unused-vars, no-shadow */

type Headers = {
    [key: string]: string
}

type Data = Record<string, unknown>;

type Options = {
    method?: string;
    data?: Data;
    timeout?: number;
    headers?: Headers
};

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (url: string, options?: Options) => Promise<HTTPResponse>

class HTTPTransport {
    METHODS = METHODS;

    get: HTTPMethod = (url, options = {}) => this
        .httpRequest(url, { ...options, method: METHODS.GET }, options?.timeout);

    post: HTTPMethod = (url, options = {}) => this
        .httpRequest(url, { ...options, method: METHODS.POST }, options?.timeout);

    put: HTTPMethod = (url, options = {}) => this
        .httpRequest(url, { ...options, method: METHODS.PUT }, options?.timeout);

    patch: HTTPMethod = (url, options = {}) => this
        .httpRequest(url, { ...options, method: METHODS.PATCH }, options?.timeout);

    delete: HTTPMethod = (url, options = {}) => this
        .httpRequest(url, { ...options, method: METHODS.DELETE }, options?.timeout);

    httpRequest(
        url: string,
        options: Options = { method: METHODS.GET },
        timeout: number = 5000,
    ): Promise<HTTPResponse> {
        const { method } = options;
        const headers: Headers | undefined = options?.headers;
        const data: Data | undefined = options?.data;

        if (method === this.METHODS.GET && data !== undefined) {
            url = HTTPTransport.getFormatGetParams(url, data);
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method || 'GET', url);
            xhr.onload = function () { resolve(new HTTPResponse(xhr)); };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.timeout = timeout;
            HTTPTransport.setHeaders(xhr, headers || {});

            if (method === METHODS.GET) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data || {}));
            }
        });
    }

    static getFormatGetParams(url: string, data: Data) {
        return `${url}?${new URLSearchParams(data as Record<string, string>).toString()}`;
    }

    static setHeaders(xhr: XMLHttpRequest, headers: Headers) {
        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });
    }
}

export default HTTPTransport;
