import Component from '../Component.ts';
import { Props } from '../types.ts';
import render from '../../utils/render.ts';

class Route {
    private _pathname: string;

    private _blockClass: new (...args: unknown[]) => Component;

    private _block: Component | null;

    private _props: Props;

    constructor(pathname: string, view: new (...args: unknown[]) => Component, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();

            if (typeof this._props?.rootQuery === 'string') {
                render(this._props.rootQuery, this._block);
            }

            return;
        }

        this._block.show();
    }
}

export default Route;
