import './main.scss';
import template from './main.tmpl.ts';
import Component from '../../services/Component.ts';

class MainLayout extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default MainLayout;
