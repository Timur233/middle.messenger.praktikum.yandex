import '../../styles/main.scss';
import './style.scss';
import ErrorMessage from '../../modules/error-message/error-message.ts';
import Page from '../../services/Page.ts';
import Component from '../../services/Component.ts';

export default class PageNotFound extends Page {
    protected setup(): Component {
        const message = new ErrorMessage({
            classList:      'error-page__message',
            title:          '404',
            text:           'Не туда попали',
            errorLink:      '/pages/messenger/index.html',
            errorLinkTitle: 'Назад к чатам',
        });

        this.setProps({ classList: 'error-page__wrapper' });
        this.setPageMeta({
            title: '404 - Вы потерялись',
        });

        return message;
    }
}
