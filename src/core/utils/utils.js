export function remove(array, item) {
    if(array.length) {
        let index = array.indexOf(item);
        if(index > -1) {
            array.splice(index, 1)
        }
    }
}