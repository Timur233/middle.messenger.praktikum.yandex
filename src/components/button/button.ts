import './button.scss';
import template from './button.tmpl.ts';
import Component from '../../services/Component.ts';

class Button extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default Button;
