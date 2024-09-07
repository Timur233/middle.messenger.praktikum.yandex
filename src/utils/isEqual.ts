type PlainObject<T = any> = {
    // eslint-disable-next-line no-unused-vars
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function isEqual(leftObject: PlainObject, rightObject: PlainObject) {
    if (Object.keys(leftObject).length !== Object.keys(rightObject).length) {
        return false;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(leftObject)) {
        const rightValue = rightObject[key];

        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                // eslint-disable-next-line no-continue
                continue;
            }

            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export default isEqual;
