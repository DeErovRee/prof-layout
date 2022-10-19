let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4)
}

let change = (cart, req) => {
    let find = cart.contents.file(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4)
}

let remove = (cart, req) => {
    cart.contents.remove(req.body);
    return JSON.stringify(cart, null, 4)
}