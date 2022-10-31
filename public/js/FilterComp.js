Vue.component('search', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: ` <form action="#" class="search-form"
                    @submit.prevent='$root.$refs.product.filter(userSearch)'>
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <img src="../images/search.svg"></i>
                    </button>
                </form>`
})
