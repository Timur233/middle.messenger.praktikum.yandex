import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import HTTPTransport from './HTTPTransport.ts';

describe('HTTP Transport', () => {
    use(sinonChai);

    const sandbox = createSandbox();
    let httpTransport: HTTPTransport;
    let httpRequestStub: SinonStub<any>;

    beforeEach(() => {
        httpTransport = new HTTPTransport({
            APP_URL: 'https://example.com/api',
        });
        httpRequestStub = sandbox.stub(httpTransport, 'httpRequest' as keyof typeof httpTransport)
            .callsFake(() => Promise.resolve());
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call httpRequest with correct parameters for GET method', () => {
        httpTransport.get('/get', { data: { a: 1, b: 2 }, timeout: 5000 });

        expect(httpRequestStub).calledWithMatch(
            'https://example.com/api/get',
            {
                data:   { a: 1, b: 2 },
                method: 'GET',
            },
            5000,
        );
    });

    it('should call httpRequest with correct parameters for POST method', () => {
        httpTransport.post('/post', { data: { a: 1, b: 2 }, timeout: 5000 });

        expect(httpRequestStub).calledWithMatch(
            'https://example.com/api/post',
            {
                data:   { a: 1, b: 2 },
                method: 'POST',
            },
            5000,
        );
    });

    it('should call httpRequest with correct parameters for PUT method', () => {
        httpTransport.put('/put', { data: { a: 1, b: 2 }, timeout: 5000 });

        expect(httpRequestStub).calledWithMatch(
            'https://example.com/api/put',
            {
                data:   { a: 1, b: 2 },
                method: 'PUT',
            },
            5000,
        );
    });

    it('should call httpRequest with correct parameters for PATCH method', () => {
        httpTransport.patch('/patch', { data: { a: 1, b: 2 }, timeout: 5000 });

        expect(httpRequestStub).calledWithMatch(
            'https://example.com/api/patch',
            {
                data:   { a: 1, b: 2 },
                method: 'PATCH',
            },
            5000,
        );
    });

    it('should call httpRequest with correct parameters for DELETE method', () => {
        httpTransport.delete('/delete', { data: { a: 1, b: 2 }, timeout: 5000 });

        expect(httpRequestStub).calledWithMatch(
            'https://example.com/api/delete',
            {
                data:   { a: 1, b: 2 },
                method: 'DELETE',
            },
            5000,
        );
    });

    it('should initialize with default or provided APP_URL', () => {
        const defaultHttp = new HTTPTransport();
        const customHttp = new HTTPTransport({ APP_URL: 'https://customapi.example.com' });

        expect(defaultHttp.APP_URL).to.equal('https://ya-praktikum.tech/api/v2');
        expect(customHttp.APP_URL).to.equal('https://customapi.example.com');
    });

    it('should format GET parameters correctly', () => {
        const url = '/test-url';
        const data = { a: 1, b: 2 };

        const formattedUrl = HTTPTransport.getFormatGetParams(url, data);

        expect(formattedUrl).to.equal('/test-url?a=1&b=2');
    });
});
