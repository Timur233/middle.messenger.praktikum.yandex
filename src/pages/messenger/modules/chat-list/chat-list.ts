import './chat-list.scss';
import template from './chat-list.tmpl.ts';
import Component from '../../../../services/Component.ts';

class ChatList extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ChatList;
