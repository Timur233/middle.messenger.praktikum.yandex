import './error-message.scss';
import template from './error-message.tmpl.ts';
import Component from '../../services/Component.ts';

class ErrorMessage extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ErrorMessage;
