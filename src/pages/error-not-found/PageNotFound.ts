import Page from '../../services/Page.ts';
import Component from '../../services/Component.ts';
import ErrorMessage from '../../modules/error-message/error-message.ts';

export default class PageNotFound extends Page {
    setup(): Component {
        const message = new ErrorMessage({
            classList:      'error-page__message',
            title:          '404',
            text:           'Не туда попали',
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
