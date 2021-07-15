import { Dep } from "./dep.js";
import { arrayMethods } from "./array.js";

export class Observer {
    constructor(data) {
        this.dep = new Dep()
        def(data, '__ob__', this)
        if (Array.isArray(data)) {
            data.__proto__ = arrayMethods;
            this.observeArray(data)
        } else {
            this.walk(data);
        }
    }

    walk(data) {
        for (const key in data) {
            defineReactive(data, key, data[key]);
        }
    }

    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}

export function defineReactive(obj, key, val) {
    if (typeof obj !== 'object') return;
    let dep = new Dep;
    let childOb = typeof val === 'object' && observe(val);
    console.log(obj, key, childOb)
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.depend();
            if (childOb) {
                childOb.dep.depend();
                console.log(obj, key, val, childOb, '--------------------')
                if (Array.isArray(val)) {
                    dependArray(val)
                }
            }
            return val;
        },
        set(newValue) {
            if (newValue === val) return;
            val = newValue;
            childOb = observe(newValue)
            dep.notify();
        }
    });
}

export function observe(value) {
    if (typeof value !== 'object') return;
    if (value.__ob__) {
        return value.__ob__;
    } else {
        return new Observer(value);
    }
}

export function def(obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: false,
        writable: true,
        configurable: true
    });
}

function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}

