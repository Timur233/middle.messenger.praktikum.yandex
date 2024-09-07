import WSTransport, { SendDataType } from '../services/http/WSTransport.ts';

export default class MessengerWS {
    private _wsTransport: WSTransport;

    private _pingPongInterval: number | null = null;

    private _pingPongDelay: number = 10000;

    constructor(userId: number, chatId: number, token: string) {
        this._wsTransport = new WSTransport(`/chats/${userId}/${chatId}/${token}`);

        this._init();
    }

    private _init(): void {
        this._onOpen();
        this._onClose();
        this._onError();
    }

    private _onOpen(): void {
        this._wsTransport.addListener('open', () => {
            this._pingPongInterval = window.setInterval(() => {
                this.send({ type: 'ping' });
            }, this._pingPongDelay);

            this.send({
                type:    'get old',
                content: '0',
            });
        });
    }

    private _onClose(): void {
        this._wsTransport.addListener('close', (event) => {
            if (!event.wasClean) {
                throw new Error(`Код: ${event.code} | Причина: ${event.reason}`);
            }

            clearInterval(this._pingPongInterval as number);
        });
    }

    private _onError(): void {
        this._wsTransport.addListener('error', (event) => {
            throw new Error(`Ошибка: ${event.message}`);
        });
    }

    public onMessage(callback: (...args: any) => unknown): void {
        this._wsTransport.addListener('message', (event) => {
            callback(JSON.parse(event.data));
        });
    }

    public send(data: SendDataType) {
        this._wsTransport.send(data);
    }

    public close() {
        this._wsTransport.close();
    }
}
