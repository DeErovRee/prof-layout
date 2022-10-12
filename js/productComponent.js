Vue.component('products', {
    props: ['products', 'img'],
    template: `
        <div class="products">
            <product v-for="item of products"
            :key="item.id_product"
            :img="img"
            :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <article class="card">
            <div class="img">
                <div class="hover">
                    <button class="button_add-to-cart" @click="$parent.$emit('add-product', product), $parent.$emit('cart-empty')">
                        <img class="cart_img" src="images/cart.svg" alt="">
                        Add to cart
                    </button>
                </div>
                <img :src="product.img" alt="">
            </div>
            <h3 class="text_h3_card">{{ product.product_name }}</h3>
            <p class="text_p_card">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
            <p class="text_p_price">{{ product.price }} $</p>
        </article>
    `
})