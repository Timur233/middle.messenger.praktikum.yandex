import './auth-form.scss';
import escapeHTML from '../../utils/escapeHTML.ts';
import template from './auth-form.tmpl.ts';
import Component from '../../services/Component.ts';
import FormGroup from '../form-group/form-group.ts';

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
                const fieldComponent: FormGroup | undefined = this.childs.find(i => i.id === fieldId[1]) as FormGroup;

                if (fieldComponent instanceof FormGroup) {
                    fieldComponent.methods?.validate();

                    if (fieldComponent.props?.hasError === true) {
                        hasError = fieldComponent.props?.hasError;
                    }
                }
            }
        });

        return hasError;
    }

    serialize() {
        return Object.keys(this.props.fields as FieldsList)
            .reduce((acc: Record <string, unknown>, key: string) => {
                const field: String = (this.props.fields as FieldsList)[key];
                const fieldId: RegExpMatchArray | null = field.match(/data-id="([^"]*)"/);

                if (fieldId && typeof fieldId[1] === 'string') {
                    const fieldComponent: FormGroup | undefined = this
                        .childs.find(i => i.id === fieldId[1]) as FormGroup;

                    if (fieldComponent instanceof FormGroup) {
                        acc[fieldComponent.props.name as string] = escapeHTML(fieldComponent.getValue() as string);
                    }
                }

                return acc;
            }, {});
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default Form;
