import Component from './Component.ts';

type PageMeta = {
    title?: string,
    description?: string,
    keywords?: string,
};

export default class Page extends Component {
    private _layout: Component | null;

    private _pageMeta: PageMeta;

    constructor(...args: unknown[]) {
        super(args);

        this._pageMeta = {
            title:       'null',
            description: '',
            keywords:    '',
        };
        this._layout = this.setup ? this.setup() : null;

        if (this._layout) {
            this.setProps({ content: this._layout });
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

    protected setup? (): Component;

    show(): void {
        super.show();

        this._installPageMeta();
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
