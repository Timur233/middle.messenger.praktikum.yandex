import Component from './Component.ts';
import { Methods, Props, Childs } from './types.ts';

class PropsManager {
    static parse(propsData: Props): {
        props: Props,
        childs: Childs,
        methods: Methods
    } {
        const methods: Methods = propsData?.methods ?? {};
        const props: Props = {};
        const childs: Childs = {};

        Object.keys(propsData).forEach((key: string): void => {
            const value = propsData[key];

            if (key !== 'methods') {
                if (value instanceof Component) {
                    childs[key] = value;
                } else {
                    props[key] = value;
                }
            }
        });

        return { props, childs, methods };
    }
}

export default PropsManager;
