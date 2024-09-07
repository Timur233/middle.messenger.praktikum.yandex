import './page-loader.scss';
import template from './page-loader.tmpl.ts';
import Component from '../../services/Component.ts';

class PageLoader extends Component {
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

export default PageLoader;
