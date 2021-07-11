import { remove } from '../utils/utils.js'

let uid = 0;


export class Dep {
    constructor() {
        this.subs = [];
        this.id = ++uid;
    }

    addSub(dep) {
        this.subs.push(dep);
    }

    rmSub(dep) {
        remove(this.subs, dep);
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    notify() {
        for (let i = 0, l = this.subs.length; i < l; i++) {
            this.subs[i].update()
        }
    }
}