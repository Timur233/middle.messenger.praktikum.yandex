import './form-group.scss';
import template from './form-group.tmpl.ts';
import Component from '../../services/Component.ts';

class FormGroup extends Component {
    getValue(): string {
        const input: HTMLInputElement = this.getContent('input') as HTMLInputElement;

        return input.value;
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default FormGroup;
