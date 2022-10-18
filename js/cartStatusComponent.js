const cartstatus = {
    data () {
        return {
            showCartStatus: false,
        }
    },
    template: `
    <div class="circle" v-show="showCartStatus">
        <div>{{ arr.length }}</div>
    </div>
    `
}