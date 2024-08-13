import './profile-navigation.scss';
import template from './profile-navigation.tmpl.ts';
import Component from '../../services/Component.ts';

class ProfileNavigation extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default ProfileNavigation;
