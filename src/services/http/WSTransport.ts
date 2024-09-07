import config from './cofing.ts';

export type SendDataType = {
    type: string,
    content?: string
}

export default class WSTransport {
    private _socket: WebSocket;

    constructor(url: string) {
        this._socket = new WebSocket(`${config.WS_URL}${url}`);
    }

    addListener(event: string, callback: (...args: any) => unknown) {
        this._socket.addEventListener(event, callback);
    }

    send(data: SendDataType) {
        this._socket.send(JSON.stringify(data));
    }

    close() {
        this._socket.close();
    }
}
