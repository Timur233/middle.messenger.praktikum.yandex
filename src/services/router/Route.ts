import render from '../../utils/render.ts';
import Page from '../Page.ts';
import { Props } from '../types.ts';

class Route {
    private _pathname: string;

    private _pageClass: new (...args: unknown[]) => Page;

    private _page: Page | null;

    private _props: Props;

    constructor(pathname: string, view: new (...args: unknown[]) => Page, props: Props) {
        this._pathname = pathname;
        this._pageClass = view;
        this._page = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._page) {
            this._page.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._page) {
            this._page = new this._pageClass({ rootQuery: this._props.rootQuery });
        }

        if (typeof this._props?.rootQuery === 'string') {
            render(this._props.rootQuery, this._page);
        }

        this._page.show();
    }
}

export default Route;
