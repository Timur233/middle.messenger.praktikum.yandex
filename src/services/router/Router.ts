/* eslint-disable no-constructor-return */
/* eslint-disable no-underscore-dangle */
import Page from '../Page.ts';
import Route from './Route.ts';

export class Router {
    static __instance: unknown;

    public routes: Route[];

    public history: History;

    private _rootQuery: string;

    private _currentRoute: Route | null;

    private _notFoundRoutePath: string | null;

    constructor(rootQuery?: string) {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery || '#app';
        this._notFoundRoutePath = null;

        if (Router.__instance instanceof Router) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    use(pathname: string, page: new (...args: any[]) => Page) {
        const route = new Route(pathname, page, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    useNotFound(pathname: string, page: new (...args: any[]) => Page) {
        this.use(pathname, page);

        this._notFoundRoutePath = pathname;

        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        if (route && route instanceof Route) {
            this._currentRoute = route;

            route.render();
        } else if (this._notFoundRoutePath !== null && this._notFoundRoutePath !== '') {
            this.go(this._notFoundRoutePath);
        }
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router();
