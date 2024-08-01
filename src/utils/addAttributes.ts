interface Attributes {
    [key: string]: string;
}

export default function addStyles(element: HTMLElement, attributes: Attributes) {
    const attributesKeys: string[] = Object.keys(attributes);

    attributesKeys.forEach((key: string): void => {
        element.setAttribute(`data-${[key]}`, attributes[key]);
    });
}
