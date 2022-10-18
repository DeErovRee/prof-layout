const cartstatus = {
    data () {
        return {
            showCartStatus: false,
        }
    },
    methods: {
        cartStatusVisible() {
            if (this.cart.length > 0) {
                this.showCartStatus = true;
            } else if (this.cart.length < 1) {
                this.showCartStatus = false;
            }
        },
    },
    template: `
    <div class="circle" v-show="showCartStatus">
        <div>{{ arr.length }}</div>
    </div>
    `
}