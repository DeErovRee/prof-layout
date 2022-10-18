const cartstatus = {
    data () {
        return {
            showCartStatus: false,
        }
    },
    methods: {
        cartStatusVisible() {
            let acc = 0;
            this.$parent.$refs.cart.cart.forEach(el => {
                acc += el.quantity;
            });
            if (acc >= 1) {
                this.showCartStatus = true;
            } else if (acc < 1) {
                this.showCartStatus = false;
            }
        },
    },
    template: `
    <div class="circle" v-show="showCartStatus">
        <div>{{ cart.length }}</div>
    </div>
    `
}