import HTTPTransport from '../services/http/HTTPtransport.ts';

export default abstract class BaseAPI {
    protected http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    public get?(data: Record<string, unknown>): Promise<unknown>;

    public create?(data: Record<string, unknown>): Promise<unknown>;

    public update?(data: Record<string, unknown>): Promise<unknown>;

    public delete?(id: string | number): Promise<unknown>;
}
