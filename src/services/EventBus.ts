// eslint-disable-next-line no-unused-vars
type Callback<Args extends unknown[] = unknown[], ReturnType = void> = (...args: Args) => ReturnType;

interface Listeners {
    [event: string]: Callback[];
}

export default class EventBus {
    private _listeners: Listeners;

    constructor() {
        this._listeners = {};
    }

    on(event: string, callback: Callback): void {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    off(event: string, callback: Callback): void {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event] = this._listeners[event].filter(
            listener => listener !== callback,
        );
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
