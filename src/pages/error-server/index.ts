import '../../styles/main.scss';
import './style.scss';
import render from '../../utils/render.ts';
import ErrorMessage from '../../modules/error-message/error-message.ts';

const message = new ErrorMessage({
    classList:      'error-page__message',
    title:          '500',
    text:           'Мы уже фиксим',
    errorLink:      '/pages/messenger/index.html',
    errorLinkTitle: 'Назад к чатам',
});

render('#app', message);
