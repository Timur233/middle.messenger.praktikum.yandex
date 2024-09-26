/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import Component from './Component.ts';

describe('Component', () => {
    it('should initialize the component correctly', () => {
        const component = new Component();

        expect(component).to.have.property('id').that.is.a('string');
        expect(component.props).to.be.an('object');
        expect(component.methods).to.be.an('object');
        expect(component.childs).to.be.an('array');
    });

    it('should make props proxy work correctly', () => {
        const props = { key: 'value' };
        const component = new Component(props);

        const proxyProps = component.props;

        expect(proxyProps.key).to.equal('value');
        proxyProps.key = 'newValue';
        expect(proxyProps.key).to.equal('newValue');

        expect(() => {
            delete proxyProps.key;
        }).to.throw('Нельзя удалить свойство key');
    });

    it('should call lifecycle methods', () => {
        const component = new Component();
        const spyDidMount = sinon.spy(component, 'componentDidMount');
        const spyDidUpdate = sinon.spy(component, 'componentDidUpdate');
        const spyBeforeRender = sinon.spy(component, 'componentBeforeRender');
        const spyAfterRender = sinon.spy(component, 'componentAfterRender');

        component.dispatchComponentDidMount();
        expect(spyDidMount).to.have.been.called;

        component.setProps({ key: 'value' });
        expect(spyDidUpdate).to.have.been.called;

        component.compile('<div>{{key}}</div>', {});
        expect(spyBeforeRender).to.have.been.called;
        expect(spyAfterRender).to.have.been.called;
    });

    it('should update props correctly', () => {
        const component = new Component();
        const newProps = { newKey: 'newValue' };

        const spyDispatch = sinon.spy(component, 'dispatchComponentDidUpdate');

        component.setProps(newProps);

        expect(component.props).to.include(newProps);
        expect(spyDispatch).to.have.been.called;
    });
});
