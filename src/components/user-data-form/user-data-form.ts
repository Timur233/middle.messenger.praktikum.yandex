import './user-data-form.scss';
import template from './user-data-form.tmpl.ts';
import Component from '../../services/Component.ts';

class Form extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default Form;
