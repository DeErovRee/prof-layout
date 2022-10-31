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
                this.$root.$refs.cart.cartEmpty()
                this.$root.$refs.cartstatus.cartStatusVisible()
            });
    },
    methods: {
        addProduct(item){
            let find = this.cart.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${ item.id_product }/${item.product_name}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                        this.$root.$refs.cart.cartEmpty()
                        this.$root.$refs.cartstatus.cartStatusVisible()
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart/${ item.id_product }/${item.product_name}`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cart.push(prod)
                        }
                        this.$root.$refs.cart.cartEmpty()
                        this.$root.$refs.cartstatus.cartStatusVisible()
                    })
                this.$root.$refs.cartstatus.cartStatusVisible()
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
        minusItem(item){
            if (item.quantity > 1) {
                this.$parent.putJson(`api/cart/${ item.id_product }/${item.product_name}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                        this.$root.$refs.cart.cartEmpty()
                        this.$root.$refs.cartstatus.cartStatusVisible()
                    })
            } else {
                this.$parent.delJson(`api/cart/${ item.id_product }/${ item.product_name}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cart.splice(this.cart.indexOf(item), 1);
                        } else {
                            console.log('error')
                        }
                        this.$root.$refs.cart.cartEmpty()
                        this.$root.$refs.cartstatus.cartStatusVisible()
                    })
            }
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