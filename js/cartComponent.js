Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility', 'emptyCart'],
    template: `
        <div class="cart-block" v-show="visibility">
            <h3 v-show="emptyCart">Корзина пуста</h3>
            <cart-item v-for="item of cartItems"
            :key="item.id_product"
            :img="img"
            :cart-item="item"></cart-item>
        </div>
    `
})

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
        <div class="cart-item">
            <img :src="cartItem.img" alt="Some img" class="cartProductImg">
            <div class="cartProductInfo">
                
                <h3>{{cartItem.product_name}}</h3>
                <div><span class="color-text">{{cartItem.price}} $</span></div>
                <div>Кол-во: {{cartItem.quantity}}</div>
            </div>
            <div class="right-block">
                <div class="product-price">{{cartItem.quantity*cartItem.price}} $</div>
                <button class="buy-btn" @click="$root.removeProduct(cartItem), $root.cartEmpty(), $root.cartStatusVisible()">X</button>
            </div>
        </div>
    `
})