export default function debounce(callback: Function, delay: number) {
    let timeout: unknown;

    return (...args: any[]) => {
        clearTimeout(timeout as number);
        timeout = setTimeout(() => {
            callback.apply({}, args);
        }, delay);
    };
}
