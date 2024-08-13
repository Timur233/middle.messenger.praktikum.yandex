import './chat-item.scss';
import template from './chat-item.tmpl.ts';
import Component from '../../../../../../services/Component.ts';

class ChatItem extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ChatItem;
