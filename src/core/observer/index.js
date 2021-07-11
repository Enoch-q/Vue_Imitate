import { Dep } from "./dep.js";

export class Observer {
    constructor(data) {
        def(data, '__ob__', this)
        if (Array.isArray(data)) {

        } else {
            this.walk(data);
        }
    }

    walk(data) {
        for (const key in data) {
            defineReactive(data, key, data[key]);
        }
    }
}

export function defineReactive(obj, key, val) {
    if (typeof obj !== 'object') return;
    let dep = new Dep;
    typeof val === 'object' && observe(val);
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.depend();
            return val;
        },
        set(newValue) {
            if (newValue === val) return;
            val = newValue;
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

