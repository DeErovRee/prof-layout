Vue.component('cartstatus', {
    data () {
        return {
            showCartStatus: false,
            acc: 0,
        }
    },
    mounted(){
    },
    methods: {
        cartStatusVisible() {
            this.$parent.getJson(`/api/cart`)
            .then(data => {
                this.acc = 0;
                for (let item of data.contents) {
                    this.acc += item.quantity
                }
                if (this.acc > 0) {
                    this.showCartStatus = true;
                } else if (this.acc <= 0) {
                    this.showCartStatus = false;
                }
            })
        },
    },
    template: `
    <div class="circle" v-show="showCartStatus">
        <div>{{ this.acc }}</div>
    </div>
    `
})