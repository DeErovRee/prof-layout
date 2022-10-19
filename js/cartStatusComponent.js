const cartstatus = {
    data () {
        return {
            showCartStatus: false,
            acc: 0,
        }
    },
    methods: {
        cartStatusVisible() {
            this.acc = 0;
            this.$parent.$refs.cart.cart.forEach(el => {
                this.acc += el.quantity
            });
            if (this.acc >= 1) {
                this.showCartStatus = true;
            } else if (this.acc < 1) {
                this.showCartStatus = false;
            }
        },
    },
    template: `
    <div class="circle" v-show="showCartStatus">
        <div>{{ this.acc }}</div>
    </div>
    `
}