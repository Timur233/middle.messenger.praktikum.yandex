import './avatar-uploader.scss';
import template from './avatar-uploader.tmpl';
import Component from '../../services/Component.ts';

export default class AvatarUploader extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}
