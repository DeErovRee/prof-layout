const search = {
    data () {
        return {
            userSearch: '',
        };
    },
    methods: {

    },
    template: `
            <form action="#" class="search-form"
            @submit.prevent='$root.$refs.products.filter(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <img src="../images/search.svg"></i>
                </button>
            </form>
    `
}