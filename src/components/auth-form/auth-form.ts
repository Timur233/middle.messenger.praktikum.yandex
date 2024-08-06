import './auth-form.scss';
import template from './auth-form.tmpl.ts';
import Component from '../../services/Component.ts';

type FieldsList = {
    [key: string]: String;
};

class Form extends Component {
    validate(): Boolean {
        let hasError: Boolean = false;

        Object.keys(this.props.fields as FieldsList).forEach((key: string) => {
            const field: String = (this.props.fields as FieldsList)[key];
            const fieldId: RegExpMatchArray | null = field.match(/data-id="([^"]*)"/);

            if (fieldId && typeof fieldId[1] === 'string') {
                const fieldComponent: Component | undefined = this.childs.find(i => i.id === fieldId[1]);

                if (fieldComponent instanceof Component) {
                    fieldComponent.methods?.validate();

                    if (fieldComponent.props?.hasError === true) {
                        hasError = fieldComponent.props?.hasError;
                    }
                }
            }
        });

        return hasError;
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default Form;
