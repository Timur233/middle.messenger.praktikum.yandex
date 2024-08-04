import './change-data-form.scss';
import template from './change-data-form.tmpl.ts';
import Component from '../../services/Component.ts';

class ChangeDataForm extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ChangeDataForm;
