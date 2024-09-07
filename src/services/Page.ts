import Component from './Component.ts';

type PageMeta = {
    title?: string,
    description?: string,
    keywords?: string,
};

export default class Page extends Component {
    private _layoutElement: Component | null;

    private _loaderElement: Component | null;

    private _pageMeta: PageMeta;

    constructor(...args: any[]) {
        super(...args);

        this._pageMeta = {
            title:       'null',
            description: '',
            keywords:    '',
        };
        this._loaderElement = this._loader() || null;
        this._layoutElement = this._setup() || null;

        if (this._layoutElement) {
            this.setProps({ content: this._layoutElement, loader: this._loaderElement });
        }
    }

    protected setPageMeta(meta: PageMeta) {
        if (typeof meta === 'object' && meta !== null) {
            this._pageMeta.title = meta?.title || 'null';
            this._pageMeta.description = meta?.description || '';
            this._pageMeta.keywords = meta?.keywords || '';
        }
    }

    private _installPageMeta() {
        if (this._pageMeta?.title) {
            document.title = this._pageMeta.title;
        }

        if (this._pageMeta?.description) {
            Page.setMetaTag('description', this._pageMeta.description);
        }

        if (this._pageMeta?.keywords) {
            Page.setMetaTag('keywords', this._pageMeta.keywords);
        }
    }

    protected _setup() {
        if (this.setup) return this.setup();

        return null;
    }

    public setup? (): Component;

    protected _loader() {
        if (this.loader) return this.loader();

        return null;
    }

    public loader? (): Component;

    destroyPage() {

    }

    hide(): void {
        this.destroyPage();
        this.getContent().remove();
    }

    showLoader(): void {
        if (this._loaderElement) {
            this._loaderElement.show();
        }
    }

    hideLoader(): void {
        if (this._loaderElement) {
            this._loaderElement.hide();
        }
    }

    render():void {
        this.compile('<div class="page-wrapper {{classList}}">{{{content}}}{{{loader}}}</div>', this.props);

        this._installPageMeta();
    }

    static setMetaTag(name: string, content: string) {
        let element: HTMLMetaElement | null = document.querySelector(`meta[name="${name}"]`);

        if (!element) {
            element = document.createElement('meta');
            element.name = name;
            document.head.appendChild(element);
        }

        element.content = content;
    }
}
