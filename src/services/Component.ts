import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus.ts';
import addStyles from '../utils/addStyles.ts';
import { Props, Methods, Childs } from './types.ts';
import PropsManager from './PropsManager.ts';

export default class Component {
    static EVENTS: { [key: string]: string } = {
        INIT:       'init',
        FLOW_CDM:   'flow:component-did-mount',
        FLOW_CDU:   'flow:component-did-update',
        FLOWrender: 'flow:render',
    };

    id: string;

    private element: HTMLElement | null = null;

    props: Props;

    methods: Methods;

    childs: Childs;

    private eventBus: () => EventBus;

    constructor(data: Props = {}) {
        const eventBus: EventBus = new EventBus();
        const descriptor = PropsManager.parse(data);

        this.id = makeUUID();
        this.props = this.makePropsProxy(descriptor.props);
        this.childs = descriptor.childs;
        this.methods = descriptor.methods;

        this.eventBus = () => eventBus;
        this.registerEvents(eventBus);
        this.eventBus().emit(Component.EVENTS.INIT);
    }

    private registerEvents(eventBus: EventBus): void {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOWrender, this.render.bind(this));
    }

    private makePropsProxy(baseProps: Props): Props {
        return new Proxy(baseProps, {
            get: (target: Props, property: string): any => target[property],
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

    private createResources():void {
        this.element = Component.createELement('div');
        this.element.setAttribute('data-id', this.id);
    }

    // eslint-disable-next-line class-methods-use-this
    componentDidMount():void {}

    dispatchComponentDidMoun():void {
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }

    // eslint-disable-next-line class-methods-use-this
    componentDidUpdate():void {}

    dispatchComponentDidUpdate():void {
        this.eventBus().emit(Component.EVENTS.FLOW_CDU);
    }

    getContent():HTMLElement {
        return this.element as HTMLElement;
    }

    addEvents():void {
        const nodes: NodeList | undefined = this.element?.querySelectorAll('[events]');

        if (nodes instanceof NodeList) {
            [...Array.from(nodes), this.element].forEach((item: Node | null):void => {
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

    setProps = (nextProps: Props):void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
        this.componentDidUpdate();
        this.dispatchComponentDidUpdate();
    };

    init():void {
        this.createResources();
        this.eventBus().emit(Component.EVENTS.FLOWrender);
    }

    compile(template: string, props: Props):void {
        if (this.element instanceof HTMLElement) {
            const templateNode:HTMLTemplateElement = document.createElement('template');
            const templateData: Props = { ...props };
            let rootElement:HTMLElement | null = null;

            Object.entries(this.childs).forEach(([key, child]) => {
                templateData[key] = `<div data-id="${child.id}"></div>`;
            });

            templateNode.innerHTML = Handlebars.compile(template)(templateData);
            rootElement = templateNode.content.children[0] as HTMLElement;

            this.element.parentNode?.replaceChild(rootElement, this.element);
            this.element.remove();
            this.element = rootElement;
            this.element.setAttribute('data-id', this.id);

            Object.values(this.childs).forEach((child: Component) => {
                const stub = this.element?.querySelector(`[data-id="${child.id}"]`);

                stub?.replaceWith(child.getContent());
            });

            this.addEvents();
        }
    }

    render():void {
        if (this.element instanceof HTMLElement) this.element.innerHTML = '';
    }

    show():void {
        if (this.element instanceof HTMLElement) {
            addStyles(this.element, { display: 'block' });
        }
    }

    hide():void {
        if (this.element instanceof HTMLElement) {
            addStyles(this.element, { display: 'none' });
        }
    }

    static createELement(tag: string): HTMLElement {
        return document.createElement(tag);
    }
}
