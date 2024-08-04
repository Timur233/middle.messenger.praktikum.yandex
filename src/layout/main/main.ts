import './main.scss';
import template from './main.tmpl.ts';
import Component from '../../services/Component.ts';

class MainLayout extends Component {
    componentDidUpdate(): void {
        this.render();
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default MainLayout;
