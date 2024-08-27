class HTTPResponse {
    xhr: XMLHttpRequest;

    constructor(xhr: XMLHttpRequest) {
        this.xhr = xhr;
    }

    json(): Object | undefined {
        try {
            return JSON.parse(this.xhr.responseText);
        } catch (error) {
            throw new Error(`Invalid JSON response ${error}`);
        }
    }

    text(): string {
        return this.xhr.responseText;
    }

    get headers(): { [key: string]: string } {
        const headers: { [key: string]: string } = {};
        const rawHeaders: string[] = this.xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);

        rawHeaders.forEach((line: string) => {
            const parts: string[] = line.split(': ');
            const header: string | undefined = parts.shift();
            const value: string | undefined = parts[0];

            if (header && value) headers[header] = value;
        });

        return headers;
    }

    get status(): number {
        return this.xhr.status;
    }

    get statusText(): string {
        return this.xhr.statusText;
    }
}

export default HTTPResponse;
