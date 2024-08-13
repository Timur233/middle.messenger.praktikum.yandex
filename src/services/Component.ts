import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus.ts';
import addStyles from '../utils/addStyles.ts';
import {
    Props, Methods, ChildComponents, ComponentDataType,
} from './types.ts';
import PropsManager from './PropsManager.ts';

export default class Component <ComponentData extends ComponentDataType = {}> {
    static EVENTS: { [key: string]: string } = {
        INIT:       'init',
        FLOW_CDM:   'flow:component-did-mount',
        FLOW_CDU:   'flow:component-did-update',
        FLOWrender: 'flow:render',
    };

    id: string;

    private _element: HTMLElement | null = null;

    props: Props;

    methods: Methods;

    childs: ChildComponents;

    private _eventBus: () => EventBus;

    constructor(data?: ComponentData) {
        const eventBus: EventBus = new EventBus();
        const compoentDescriptor = new PropsManager(data || {});

        this.id = makeUUID();
        this.props = this._makePropsProxy(compoentDescriptor.props);
        this.childs = compoentDescriptor.childs;
        this.methods = compoentDescriptor.methods;

        this._eventBus = () => eventBus;
        this._registerEvents(eventBus);
        this._eventBus().emit(Component.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOWrender, this.render.bind(this));
    }

    private _makePropsProxy(baseProps: Props): Props {
        return new Proxy(baseProps, {
            get: (target: Props, property: string): unknown => target[property],
            set: (target: Props, property: string, value: unknown): boolean => {
                target[property] = value;

                this.render();

                return true;
            },
            deleteProperty: (_target: Props, property: string): boolean => {
                throw new Error(`Нельзя удалить свойство ${property}`);
            },
        });
    }

    private _createResources():void {
        this._element = Component.createELement('div');
        this._element.setAttribute('data-id', this.id);
    }

    init():void {
        this._createResources();
        this._eventBus().emit(Component.EVENTS.FLOWrender);
    }

    setProps = (nextProps: Props):void => {
        if (!nextProps) {
            return;
        }

        const prevProps = { ...this.props };
        const props = new PropsManager(nextProps);

        Object.assign(this.props, props.props);
        this.childs = [...this.childs, ...props.childs];

        this.dispatchComponentDidUpdate(prevProps, this.props);
    };

    // eslint-disable-next-line class-methods-use-this
    componentDidMount():void {}

    private _componentDidMount():void {
        this.componentDidMount();
    }

    dispatchComponentDidMount():void {
        this._eventBus().emit(Component.EVENTS.FLOW_CDM);
    }

    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    componentDidUpdate(_prevProps?: Props | unknown, _nextProps?: Props | unknown) { }

    private _componentDidUpdate(prevProps: Props | unknown, nextProps: Props | unknown):void {
        this.componentDidUpdate(prevProps, nextProps);
    }

    dispatchComponentDidUpdate(prevProps: Props, nextProps: Props):void {
        this._eventBus().emit(Component.EVENTS.FLOW_CDU, prevProps, nextProps);
    }

    private removeEvents():void {
        const nodes: NodeList | undefined = this._element?.querySelectorAll('[events]');

        if (nodes instanceof NodeList) {
            [...Array.from(nodes), this._element].forEach((item: Node | null):void => {
                const eventsString: string = (item as HTMLElement).getAttribute('events') as string;

                const eventsObject: {[key: string]: string} = JSON.parse(eventsString
                    ? eventsString?.replaceAll('\'', '"') : '{}');
                const eventsKeys: string[] = Object.keys(eventsObject);

                if (eventsKeys.length > 0) {
                    eventsKeys.forEach((eventName: string): void => {
                        const handlerName: string = eventsObject[eventName];

                        if (this.methods instanceof Object) {
                            (item as HTMLElement).removeEventListener(eventName, this.methods[handlerName]);
                        }
                    });
                }

                (item as HTMLElement).removeAttribute('events');
            });
        }
    }

    private addEvents():void {
        const nodes: NodeList | undefined = this._element?.querySelectorAll('[events]');

        if (nodes instanceof NodeList) {
            [...Array.from(nodes), this._element].forEach((item: Node | null):void => {
                const eventsString: string = (item as HTMLElement).getAttribute('events') as string;

                const eventsObject: {[key: string]: string} = JSON.parse(eventsString
                    ? eventsString?.replaceAll('\'', '"') : '{}');
                const eventsKeys: string[] = Object.keys(eventsObject);

                if (eventsKeys.length > 0) {
                    eventsKeys.forEach((eventName: string): void => {
                        const handlerName: string = eventsObject[eventName];

                        if (this.methods instanceof Object) {
                            (item as HTMLElement).addEventListener(eventName, this.methods[handlerName]);
                        }
                    });
                }

                (item as HTMLElement).removeAttribute('events');
            });
        }
    }

    compile(template: string, props: Props):void {
        if (this._element instanceof HTMLElement) {
            const templateNode:HTMLTemplateElement = document.createElement('template');
            const templateData: Props = { ...props };
            let rootElement:HTMLElement | null = null;

            templateNode.innerHTML = Handlebars.compile(template)(templateData);
            rootElement = templateNode.content.children[0] as HTMLElement;

            this.removeEvents();

            setTimeout(() => {
                if (this._element) {
                    this._element.parentNode?.replaceChild(rootElement, this._element);
                    this._element.remove();
                    this._element = rootElement;
                    this._element.setAttribute('data-id', this.id);

                    this.childs.forEach((child: Component) => {
                        const stub = this._element?.querySelector(`[data-id="${child.id}"]`);

                        stub?.replaceWith(child.getContent());
                        child.dispatchComponentDidMount();
                    });

                    this.addEvents();
                }
            }, 0);
        }
    }

    render():void {
        if (this._element instanceof HTMLElement) this._element.innerHTML = '';
    }

    getContent(selector: string = ''):HTMLElement {
        if (selector !== '') {
            return this._element?.querySelector(selector) as HTMLElement;
        }

        return this._element as HTMLElement;
    }

    show():void {
        if (this._element instanceof HTMLElement) {
            addStyles(this._element, { display: '' });
        }
    }

    hide():void {
        if (this._element instanceof HTMLElement) {
            addStyles(this._element, { display: 'none' });
        }
    }

    static createELement(tag: string): HTMLElement {
        return document.createElement(tag);
    }
}
