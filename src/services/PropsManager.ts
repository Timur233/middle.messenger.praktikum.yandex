import Component from './Component.ts';
import {
    Methods, Props, ChildComponents, ComponentDataType,
} from './types.ts';

class PropsManager <ComponentData extends ComponentDataType> {
    componentData: ComponentData;

    methods: Methods;

    props: Props;

    childs: ChildComponents;

    private _visited: WeakMap<object, unknown> = new WeakMap();

    constructor(data: ComponentData) {
        this.componentData = this.deepCopy<ComponentData>(data);
        this.methods = this.componentData?.methods ?? {};
        this.props = {};
        this.childs = [];

        delete this.componentData.methods;

        this.recursiveParse(this.componentData, this.props);
    }

    deepCopy<T>(currentObject: T): T {
        if (currentObject === null || typeof currentObject !== 'object') {
            return currentObject;
        }

        if (currentObject instanceof Component) {
            return currentObject;
        }

        if (this._visited.has(currentObject as object)) {
            // eslint-disable-next-line no-console
            console.warn(`Обнаружена циклическая зависимость. Объект: ${currentObject}`);

            return this._visited.get(currentObject as object) as T;
        }

        if (Array.isArray(currentObject)) {
            const copy: unknown[] = [];

            this._visited.set(currentObject, copy);

            currentObject.forEach((item: unknown) => {
                copy.push(this.deepCopy(item));
            });

            return copy as unknown as T;
        }

        if (currentObject instanceof Date) {
            return new Date(currentObject.getTime()) as unknown as T;
        }

        if (currentObject instanceof Map) {
            const copy = new Map();

            this._visited.set(currentObject, copy);
            currentObject.forEach((value: unknown, key: string) => {
                copy.set(key, this.deepCopy(value));
            });

            return copy as unknown as T;
        }

        if (currentObject instanceof Set) {
            const copy = new Set();

            this._visited.set(currentObject, copy);
            currentObject.forEach((value:unknown) => {
                copy.add(this.deepCopy(value));
            });

            return copy as unknown as T;
        }

        const copy: { [key: string]: unknown } = {};

        this._visited.set(currentObject, copy);
        Object.keys(currentObject).forEach((key: string) => {
            if (Object.prototype.hasOwnProperty.call(currentObject, key)) {
                copy[key] = this.deepCopy((currentObject as { [key: string]: unknown })[key]);
            }
        });

        return copy as T;
    }

    recursiveParse(currentObject: ComponentData | unknown, targetObject: Props): void {
        if (Array.isArray(currentObject)) {
            currentObject.forEach((item, index) => {
                if (this.callback(String(index), item, targetObject)) {
                    this.recursiveParse(item, targetObject[index] as Props);
                }
            });
        } else if (typeof currentObject === 'object' && currentObject !== null) {
            Object.keys(currentObject).forEach((key: string) => {
                if (this.callback(key, (currentObject as ComponentData)[key], targetObject)) {
                    this.recursiveParse((currentObject as ComponentData)[key], targetObject[key] as Props);
                }
            });
        }
    }

    callback(index: string, item: unknown, parent: Props):Boolean {
        if (item instanceof Component) {
            parent[index] = `<div data-id="${item.id}"></div>`;
            this.childs.push(item);

            return false;
        }

        parent[index] = item;

        return true;
    }
}

export default PropsManager;
