const product = {
    props: ['product', 'img'],
    template: `
        <article class="card">
            <div class="img">
                <div class="hover">
                    <button class="button_add-to-cart" @click="$root.$refs.cart.addProduct(product), $root.$refs.cart.cartEmpty(), $root.$refs.cartstatus.cartStatusVisible()">
                        <img class="cart_img" src="images/cart.svg" alt="">
                        Add to cart
                    </button>
                </div>
                <img :src="img" alt="">
            </div>
            <h3 class="text_h3_card">{{ product.product_name }}</h3>
            <p class="text_p_card">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
            <p class="text_p_price">{{ product.price }} $</p>
        </article>
    `
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: [], // 'https://via.placeholder.com/200x150'
            filtered: [],
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
        
        this.$parent.getJson(`../getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    methods: {
        filter(val){
            const regexp = new RegExp(val, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
    },
    template: `
        <div class="products">
            <product v-for="item of products"
            :key="item.id_product"
            :product="item"
            :img="item.img"></product>
        </div>
    `
};