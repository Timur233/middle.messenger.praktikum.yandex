import Component from './Component.ts';

export interface Methods {
    // eslint-disable-next-line no-unused-vars
    [key: string]: (event: Event) => void
}

export interface Props {
    [key: string]: unknown,
    methods?: Methods
}

export interface Childs {
    [key: string]: Component
}
