Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: []
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img1/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(val){
            const regexp = new RegExp(val.trim(), 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
    }},
   template: `<div class="products">
   <product v-for="item of filtered"
   :key="item.id_product"
   :product="item"
   :img="item.img"></product>
</div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
                <article class="card">
                <div class="img">
                    <div class="hover">
                        <button class="button_add-to-cart" @click="$root.$refs.cart.addProduct(product)">
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
})