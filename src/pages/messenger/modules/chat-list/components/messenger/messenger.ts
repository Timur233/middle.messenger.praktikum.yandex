import './messenger.scss';
import template from './messenger.tmpl.ts';
import Component from '../../../../../../services/Component.ts';

class Messenger extends Component {
    componentDidUpdate(): void {
        this.render();
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default Messenger;
