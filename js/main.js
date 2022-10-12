const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/response';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        cart: [],
        imgCatalog: [], // 'https://via.placeholder.com/200x150'
        userSearch: '',
        showCart: false,
        emptyCart: true,
        error: false,
    },
    methods: {
        filter(){
         const regexp = new RegExp(this.userSearch, 'i');
         this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                })
        },
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product)
            if (find) {
                find.quantity++;
            } else {
                this.cart.push(Object.assign({quantity:1}, product));
            }
            
            console.log(this.cart)
        },
        removeProduct(product){
            let remove = this.cart.find(el => el.id_product === product.id_product);
            if (remove.quantity > 1) {
                remove.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(remove), 1);
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
                console.log(this.emptyCart)
            } else {
                this.emptyCart = false;
                console.log(this.emptyCart)
            }
        }
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