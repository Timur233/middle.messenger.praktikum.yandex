import './user-finder.scss';
import template from './user-finder.tmpl.ts';
import Component from '../../../../../../services/Component.ts';

export default class UserFinder extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}
