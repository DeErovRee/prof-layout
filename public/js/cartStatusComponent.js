Vue.component('cartstatus', {
    data () {
        return {
            showCartStatus: false,
            acc: 0,
        }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.acc += item.quantity
                }
            })
    },
    methods: {
        cartStatusVisible() {
            this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.acc = item.quantity
                }
            })
            .then(data => {if (this.acc >= 1) {
                this.showCartStatus = true;
            } else if (this.acc < 1) {
                this.showCartStatus = false;
            }})
        },
    },
    template: `
    <div class="circle" v-show="showCartStatus">
        <div>{{ this.acc }}</div>
    </div>
    `
})