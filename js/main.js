const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/response';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        // cart: [],
        imgCatalog: [], // 'https://via.placeholder.com/200x150'
        // userSearch: '',
        // showCartStatus: false,
        showCart: false,
        // emptyCart: true,
        error: false,
    },
    components: {cart, products, search, cartstatus},
    methods: {
        
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.error = true
                })
        },

        // filter(){
        //     const regexp = new RegExp(this.userSearch, 'i');
        //     this.filtered = this.products.filter(product => regexp.test(product.product_name));
        //    },
        // addProduct(product){
        //     let find = this.cart.find(el => el.id_product === product.id_product)
        //     if (find) {
        //         find.quantity++;
        //     } else {
        //         this.cart.push(Object.assign({quantity:1}, product));
        //     }
        // },
        // removeProduct(product){
        //     let remove = this.cart.find(el => el.id_product === product.id_product);
        //     if (remove.quantity > 1) {
        //         remove.quantity--;
        //     } else {
        //         this.cart.splice(this.cart.indexOf(remove), 1);
        //     }
        // },
        // cartVisible() {
        //     if (this.showCart === false) {
        //         this.showCart = true;
        //     } else {
        //         this.showCart = false;
        //     }
        // },
        // cartStatusVisible() {
        //     if (this.cart.length > 0) {
        //         this.showCartStatus = true;
        //     } else if (this.cart.length < 1) {
        //         this.showCartStatus = false;
        //     }
        // },
        // cartEmpty() {
        //     if (this.cart.length < 1) {
        //         this.emptyCart = true;
        //     } else {
        //         this.emptyCart = false;
        //     }
        // }
    },
    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           })
           .then(error => {
                this.error = true;
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
            .then(error => {
                this.error = true;
           });
    }
});