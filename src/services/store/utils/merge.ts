/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

type Indexed<T = any> = {
    [key in string]: T;
};

export default function merge(leftObject: Indexed, rightObject: Indexed): Indexed {
    for (const prop in rightObject) {
        if (!Object.prototype.hasOwnProperty.call(rightObject, prop)) {
            continue;
        }

        try {
            if (rightObject[prop].constructor === Object) {
                rightObject[prop] = merge(leftObject[prop] as Indexed, rightObject[prop] as Indexed);
            } else {
                leftObject[prop] = rightObject[prop];
            }
        } catch {
            leftObject[prop] = rightObject[prop];
        }
    }

    return leftObject;
}
