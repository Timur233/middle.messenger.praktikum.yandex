import './searchbar.scss';
import template from './searchbar.tmpl.ts';
import Component from '../../../../../../services/Component.ts';

class Searchbar extends Component {
    componentDidMount(): void {
        this.togglePlaceholder();
    }

    componentDidUpdate(): void {
        this.togglePlaceholder();
    }

    togglePlaceholder() {
        const input = this.getContent('input.searchbar__input');
        const searchBar = this.getContent();

        input.addEventListener('focus', () => {
            searchBar.classList.add('searchbar--hide-placeholder');
        });

        input.addEventListener('blur', () => {
            searchBar.classList.remove('searchbar--hide-placeholder');
        });
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default Searchbar;
