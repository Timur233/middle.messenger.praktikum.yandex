import HTTPTransport from '../services/http/HTTPtransport.ts';

export default abstract class BaseAPI {
    protected http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    public create?(data: unknown): Promise<unknown>;

    public request?(id?: string | number): Promise<unknown>;

    public update?(id: string | number, data: unknown): Promise<unknown>;

    public delete?(id: string | number): Promise<unknown>;
}
