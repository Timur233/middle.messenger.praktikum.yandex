import './form.scss';
import template from './form.tmpl.ts';
import Component from '../../services/Component.ts';

class Form extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default Form;
