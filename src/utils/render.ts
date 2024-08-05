import Component from '../services/Component.ts';

export default function render(query: string, component: Component) {
    const root = document.querySelector(query);

    if (root instanceof HTMLElement) root.appendChild(component.getContent());

    component.dispatchComponentDidMount();

    return root;
}
