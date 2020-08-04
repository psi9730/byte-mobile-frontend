function optionalList(obj) {
    if (obj === undefined) {
        return [];
    } else {
        console.log(obj);
        return obj;
    }
}

function optionalHashmap(obj) {
    if (obj === undefined) {
        return {};
    } else {
        console.log(obj);
        return obj;
    }
}
