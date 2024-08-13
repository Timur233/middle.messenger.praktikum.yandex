import Component from './Component.ts';

export interface Methods {
    // eslint-disable-next-line no-unused-vars
    [key: string]: (event?: Event) => void
}

export interface ComponentDataType {
    [key: string]: unknown,
    methods?: Methods
}

export interface Props {
    [key: string]: unknown
}

export type ChildComponents = Component[];
