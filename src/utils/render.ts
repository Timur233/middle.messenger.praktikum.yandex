import Component from '../services/Component.ts';

export default function render(query: string, block: Component) {
    const root = document.querySelector(query);

    if (root instanceof HTMLElement) root.appendChild(block.getContent());

    return root;
}
