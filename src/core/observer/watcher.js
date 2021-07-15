import { Dep } from "./dep.js";

let uid = 0;

export class Watcher {
    constructor(vm, expression, cb) {
        this.vm = vm;
        this.expression = expression
        this.id = ++uid;
        this.newDepIds = new Set();
        this.getter = parsePath(expression);
        this.cb = cb;
        this.value = this.get();
    }

    get() {
        Dep.target = this;
        const vm = this.vm;
        let value;
        try {
            value = this.getter.call(vm, vm);
        } finally {
            Dep.target = null;
        }
        return value
    }

    addDep(dep) {
        dep.addSub(this)
    }

    update() {
        const value = this.get();
        this.cb(this.vm, value, this.value)
    }
}

export function parsePath(str) {
    let strArr = str.split('.');
    return (obj) => {
        for (let i = 0; i < strArr.length; i++) {
            obj = obj[strArr[i]]
        }
        return obj
    }
}