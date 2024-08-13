import './http-playground.scss';
import template from './http-playground.tmpl.ts';
import Component from '../../../../services/Component.ts';

class HttpPlayground extends Component {
    render():void {
        this.compile(template(), this.props);
    }
}

export default HttpPlayground;
