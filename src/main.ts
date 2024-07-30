import './styles/main.scss';
import './style.scss';

class Test {
    _test = 1;

    state: {
        a: number;
        abs: number;
    };

    a: number;

    constructor() {
        this._test = 2;
        this.state = {
            a:   1,
            abs: 2,
        };

        this.a = 0;

        this.test();
    }

    test():number {
        this.a = 2;

        return this.a;
    }
}

export default Test;
