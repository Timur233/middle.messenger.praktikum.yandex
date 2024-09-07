import { getCookie } from '../../utils/cookie.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Page from '../Page.ts';
import router from '../router/Router.ts';

export default function protectPage(PageClass: typeof Page)
    : typeof Page {
    return class ProtectedPage extends PageClass {
        protected _setup() {
            if (getCookie('isAuthorized') === '1') {
                return this?.setup ? this?.setup() : null;
            }

            router.go('/sing-in');

            return null;
        }

        show():void {
            if (getCookie('isAuthorized') === '1') {
                super.show();
            } else {
                router.go('/sing-in');
            }
        }
    };
}
