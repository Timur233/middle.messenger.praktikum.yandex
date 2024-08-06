import './profile-data.scss';
import template from './profile-data.tmpl.ts';
import Component from '../../../../services/Component.ts';

class ProfileData extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ProfileData;
