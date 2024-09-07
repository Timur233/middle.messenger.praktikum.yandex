import Page from '../../services/Page.ts';
import Component from '../../services/Component.ts';
import ErrorMessage from '../../modules/error-message/error-message.ts';

export default class PageError extends Page {
    setup(): Component {
        const message = new ErrorMessage({
            classList:      'error-page__message',
            title:          '500',
            text:           'Мы уже фиксим',
            errorLink:      '/',
            errorLinkTitle: 'Назад к чатам',
        });

        this.setProps({ classList: 'error-page__wrapper' });
        this.setPageMeta({
            title: '404 - Вы потерялись',
        });

        return message;
    }
}
