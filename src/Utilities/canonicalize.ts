//Two formats would be:


// When canconicalizing url params:
    // Arrays will only ever contain strings
    // You only have to worry about objects, arrays and strings


function canonicalizeUrlParams(object: Record<string,any>|string):string {

    //Base Case
    if (typeof(object) === "string") {
        return (object.toString())
    }

    //Recursive Case Arrays (Remember can only contain strings):
    if (Array.isArray(object)) {
        object.sort()
        return ('[' + object.toString() + ']');
    }

    //Recursive Case Objects:
    return ('{' + Object.keys(object).sort().reduce((accumulate, currentval, index) => {
        return (accumulate + (index == 0? '': ',')) + currentval.toString() + ":" + canonicalizeUrlParams(object[currentval.toString()])
    }, '') +'}')

}


export default canonicalizeUrlParams;