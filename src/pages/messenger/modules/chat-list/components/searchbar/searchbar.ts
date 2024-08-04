import './searchbar.scss';
import template from './searchbar.tmpl.ts';
import Component from '../../../../../../services/Component.ts';

class Searchbar extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default Searchbar;
