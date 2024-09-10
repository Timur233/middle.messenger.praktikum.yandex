import './chat-editor.scss';
import template from './chat-editor.tmpl.ts';
import Component from '../../../../services/Component.ts';

export default class ChatEditor extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}
