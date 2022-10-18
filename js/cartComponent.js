const cartItem = {
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
                <button class="buy-btn" @click="$parent.removeProduct(cartItem), $parent.cartEmpty(), $parent.cartStatusVisible()">X</button>
            </div>
        </div>
    `
}

const cart = {
    components: {'cart-item': cartItem},
    data () {
        return {
            cart: [],
            showCart: false,
            emptyCart: true,
        }
    },
    methods: {
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product)
            if (find) {
                find.quantity++;
            } else {
                    this.cart.push(Object.assign({quantity:1}, product));
            };
        },
        removeProduct(product){
            let remove = this.cart.find(el => el.id_product === product.id_product);
            if (remove.quantity > 1) {
                remove.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(remove), 1);
            };
        },
        cartVisible() {
            if (this.showCart === false) {
                this.showCart = true;
            } else {
                this.showCart = false;
            }
        },

        cartEmpty() {
            if (this.cart.length < 1) {
                this.emptyCart = true;
            } else {
                this.emptyCart = false;
            }
        }
    },
    template: `
        <div class="cart-block" v-show="visibility">
            <h3 v-show="emptyCart">Корзина пуста</h3>
            <cart-item v-for="item of cartItems"
            :key="item.id_product"
            :img="img"
            :cart-item="item"></cart-item>
        </div>
    `
}