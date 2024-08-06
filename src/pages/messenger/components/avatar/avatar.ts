import template from './avatar.tmpl.ts';
import Component from '../../../../services/Component.ts';

class Avatar extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default Avatar;
