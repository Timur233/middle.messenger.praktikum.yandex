import './change-avatar.scss';
import template from './change-avatar.tmpl.ts';
import Component from '../../services/Component.ts';

class ChangeAvatar extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ChangeAvatar;
