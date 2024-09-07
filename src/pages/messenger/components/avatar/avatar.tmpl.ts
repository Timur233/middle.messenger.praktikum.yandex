export default function template() {
    return `
        <img
            class="{{classList}}"
            src="{{image}}"
            alt="{{title}}"
            onerror="this.onerror=null;this.src='/images/avatar-placeholder.jpeg';"
        >
    `;
}
