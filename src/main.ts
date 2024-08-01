import './styles/main.scss';
import './style.scss';
import Button from './components/button/button.ts';
import Form from './components/form/form.ts';
import Component from './services/Component.ts';

function render(query: string, block: Component) {
    const root = document.querySelector(query);

    if (root instanceof HTMLElement) root.appendChild(block.getContent());

    return root;
}

const button = new Button({
    classList: 'button--primary',
    text:      'Click me',
    methods:   {
        clickHandler(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log(e);
        },
    },
});

const buttonOutline = new Button({
    classList: 'button--outline',
    text:      'Click me',
    methods:   {
        clickHandler(e) {
            console.log('outline');
        },
    },
});

const form = new Form({
    title:         'Title',
    login_button:  button,
    signin_button: buttonOutline,
    methods:       {
        send: () => {
            console.log('form submit');
        },
    },
});

render('#app', form);

setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
    });
}, 1000);
