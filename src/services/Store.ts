export default class Store<T> {
    private state: T;

    constructor(initialState: T) {
        this.state = initialState;
    }

    // Метод для получения текущего состояния
    public getState(): T {
        return this.state;
    }

    // Метод для обновления состояния
    public setState(newState: Partial<T>): void {
        this.state = { ...this.state, ...newState };
    }
}
