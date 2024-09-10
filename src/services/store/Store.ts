import set from './utils/set.ts';
import EventBus from '../EventBus.ts';

export enum StoreEvents {
    Updated = 'updated',
}

export class Store<T> extends EventBus {
    private state: T;

    constructor(initialState: T) {
        super();

        this.state = initialState;
    }

    public getState(path: string = ''): unknown | T {
        if (path && path !== '') {
            return path.split('.').reduce((acc: unknown, key: string) => {
                if (acc !== null && typeof acc === 'object' && acc[key as keyof object]) {
                    return acc[key as keyof object];
                }

                return null;
            }, this.state);
        }

        return this.state as T;
    }

    public setState(path: string, value: unknown): void {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated, path, value);
    }
}

export default new Store({});
