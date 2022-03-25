// function clone(data: any) {
//     return JSON.parse(JSON.stringify(data));
// }
//
// export default clone;

function clone<X>(data: X): X {
    return JSON.parse(JSON.stringify(data));
}

export default clone;