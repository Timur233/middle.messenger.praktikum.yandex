import './styles/main.scss';
import './style.scss';
import MainPage from './pages/main/index.ts';
import { Router } from './services/router/Router.ts';
import PageLogin from './pages/login/PageLogin.ts';
import PageNotFound from './pages/error-not-found/index.ts';
import PageSignup from './pages/sign-up/PageSignup.ts';

const router = new Router('#app');

router
    .use('/', MainPage)
    .use('/login', PageLogin)
    .use('/sign-up', PageSignup)
    .useNotFound('/404', PageNotFound)
    .start();
