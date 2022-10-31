Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cart: [],
          imgCart: 'https://placehold.it/50x100',
          showCart: false,
          emptyCart: false,
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img1/s${item.id_product}.jpg`;
                    this.$data.cart.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cart.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    }).then(data => this.cartEmpty())
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cart.push(prod)
                        }
                    }).then(data => this.cartEmpty())
            }
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
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.cart.splice(this.cart.indexOf(item), 1);
                    }
                })
        },
        minusItem(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(item), 1);
                        }
                    }
                })
                .then(data => this.cartEmpty())
        }
    },
    template: ` <div class="cart-block" v-show="showCart">
                    <h3 class="cart-empty" v-show="emptyCart">Cart is empty</h3>
                    <cart-item v-for="item of cart"
                    :key="item.id_product"
                    :img="item.img"
                    :cartItem="item"></cart-item>
                </div>
    `
});

Vue.component('cart-item', {
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
                <button class="buy-btn" @click="$parent.minusItem(cartItem)">X</button>
            </div>
        </div>
    `
})