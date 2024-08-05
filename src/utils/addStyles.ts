interface Styles {
    [key: string]: string;
}

export default function addStyles(element: HTMLElement, styles: Styles) {
    const stylesKeys: string[] = Object.keys(styles);

    stylesKeys.forEach((key: string): void => {
        if (key in element.style) {
            /**
             * Не нашел другого решения кроме как использовать any
             * keyof CSSStyleDeclaration вы дает ошибку
             * unknown тем более
             */
            element.style[key as any] = styles[key] as string;
        }
    });
}
