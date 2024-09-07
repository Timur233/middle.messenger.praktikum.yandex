import './searchbar.scss';
import template from './searchbar.tmpl.ts';
import Component from '../../../../../../services/Component.ts';

class Searchbar extends Component {
    componentDidMount(): void {
        this.togglePlaceholder();
    }

    componentDidUpdate(): void {
        this.togglePlaceholder();
        this.render();
    }

    togglePlaceholder() {
        const input: HTMLInputElement = this.getContent('input.searchbar__input') as HTMLInputElement;
        const searchBar = this.getContent();

        if (input) {
            input.addEventListener('focus', () => {
                searchBar.classList.add('searchbar--hide-placeholder');
            });

            input.addEventListener('blur', () => {
                if (input.value === '') searchBar.classList.remove('searchbar--hide-placeholder');
            });
        }
    }

    clearValue() {
        this.setProps({ value: '' });
    }

    render():void {
        this.compile(template(), this.props);
    }
}

export default Searchbar;
