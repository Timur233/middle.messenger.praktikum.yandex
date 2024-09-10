import './modal.scss';
import template from './modal.tmpl.ts';
import Component from '../../services/Component.ts';

export class Modal extends Component {
    constructor(...args: any[]) {
        super(...args);

        this.methods.onClickOverlay = () => {
            this.hide();
        };

        this.methods.onClickModal = (e) => {
            e?.stopPropagation();
        };

        const modal = this.getContent();
        const rootElement: HTMLElement | null = document
            .querySelector(this.props?.rootQuery as string || 'body');

        if (rootElement) {
            rootElement.appendChild(modal);
        }
    }

    render():void {
        this.compile(template(), this.props);
    }

    show(): void {
        this.setProps({ isShow: true });
    }

    hide(): void {
        this.setProps({ isShow: false });
    }
}

export default new Modal({ rootQuery: '#app' });
