const cartItem = {
    props: ['img', 'cartItem'],
    template: `
        <div class="cart-item">
            <img :src="img" alt="Some img" class="cartProductImg">
            <div class="cartProductInfo">
                
                <h3>{{ cartItem.product_name }}</h3>
                <div><span class="color-text">{{ cartItem.price }} $</span></div>
                <div>Кол-во: {{ cartItem.quantity }}</div>
            </div>
            <div class="right-block">
                <div class="product-price">{{ (cartItem.quantity * cartItem.price).toFixed(2) }} $</div>
                <button class="buy-btn" @click="$parent.removeProduct(cartItem), $parent.cartEmpty(), $root.$refs.cartstatus.cartStatusVisible()">X</button>
            </div>
        </div>
    `
}

const cart = {
    components: {'cart-item': cartItem},
    data () {
        return {
            cart: [],
            emptyCart: true,
            showCart: false,
        }
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let item of data) {
                    this.$data.cartItem.push(item)
                }
            })
    },
    methods: {
        addProduct(product){
            if (this.$root.$refs.cartstatus.acc === 99) {
                return;
            } else {
                let find = this.cart.find(el => el.id_product === product.id_product)
                if (find) {
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                        .then(data => {
                            if (data.result === 1) {
                                find.quantity++;
                            }
                        })
                } else {
                    const prod = Object.assign({quantity:1}, product);
                    this.$parent.postJson('/api/cart/', prod)
                        .then(data => {
                            if(data.result === 1) {
                                this.cartItems.push(prod)
                            }
                        })
            }}
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
        <div class="cart-block" v-show="showCart">
            <h3 class="cart-empty" v-show="emptyCart">Cart is empty</h3>
            <cart-item v-for="item of cart"
            :key="item.id_product"
            :img="item.img"
            :cartItem="item"></cart-item>
        </div>
    `
}