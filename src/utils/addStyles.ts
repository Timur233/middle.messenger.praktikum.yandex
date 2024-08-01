interface Styles {
    [key: string]: string;
}

export default function addStyles(element: HTMLElement, styles: Styles) {
    const stylesKeys: string[] = Object.keys(styles);

    stylesKeys.forEach((key: string): void => {
        (element.style as any)[key] = styles[key];
    });
}
