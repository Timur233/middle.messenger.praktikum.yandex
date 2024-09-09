export default function template() {
    return `
        <label for="avatar-uploader" class="avatar-uploader">
            <span class="avatar-uploader__caption">Выбрать файл на компьютере</span>
            <input
                id="avatar-uploader"
                type="file"
                accept=".jpeg,.jpg,.png,.gif,.webp"
                hidden
                events="{'change': 'onChange'}"
            />
        </label>
    `;
}
