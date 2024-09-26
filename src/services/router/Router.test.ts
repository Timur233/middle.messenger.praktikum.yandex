import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox } from 'sinon';
import { Router } from './Router.ts';
import Page from '../Page.ts';

describe('Router', () => {
    use(sinonChai);

    const sandbox = createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the same instance for all new Router creations', () => {
        const router1 = new Router();
        const router2 = new Router();

        expect(router1).to.equal(router2);
    });

    it('should add a route using the use method', () => {
        const router = new Router();
        const pathname = '/home';
        const page = class extends Page {};

        router.use(pathname, page);

        expect(router.routes).to.have.lengthOf(1);
        expect(router.routes[0].match(pathname)).to.equal(true);
    });

    it('should start routing and call _onRoute with current pathname', () => {
        const router = new Router();
        const pathname = '/home';

        sandbox.stub(router, '_onRoute').callsFake((path: string) => {
            expect(path).to.equal(pathname);
        });
        window.history.pushState({}, '', pathname);
        router.start();
    });
});
