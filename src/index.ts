import './styles/main.scss';
import { Router } from './services/router/Router.ts';
import PageSignin from './pages/sing-in/PageSignin.ts';
import PageNotFound from './pages/error-not-found/PageNotFound.ts';
import PageSignup from './pages/sign-up/PageSignup.ts';
import protectPage from './services/hoc/protectedPage.ts';
import PageMessenger from './pages/messenger/PageMessenger.ts';
import PageSettings from './pages/settings/PageSettings.ts';
import PageChangeData from './pages/settings-change-data/PageChangeData.ts';
import PageChangePassword from './pages/settings-change-password/PageChangePassword.ts';
import PageLogout from './pages/logout/PageLogout.ts';
import PageError from './pages/error-server/PageError.ts';

const router = new Router('#app');

router
    .use('/', protectPage(PageMessenger))
    .use('/sing-in', PageSignin)
    .use('/sign-up', PageSignup)
    .use('/settings', protectPage(PageSettings))
    .use('/settings/change-data', protectPage(PageChangeData))
    .use('/settings/change-password', protectPage(PageChangePassword))
    .use('/logout', PageLogout)
    .use('/error', PageError)
    .useNotFound('/404', PageNotFound)
    .start();
