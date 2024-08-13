import './site-navigation.scss';
import template from './site-navigation.tmpl.ts';
import Component from '../../services/Component.ts';

class SiteNavigation extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default SiteNavigation;
