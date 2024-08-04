import './formGroup.scss';
import template from './formGroup.tmpl.ts';
import Component from '../../services/Component.ts';

class FormGroup extends Component {
    getValue() {
        const input: HTMLInputElement = this.getContent('input') as HTMLInputElement;

        return input.value;
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default FormGroup;
