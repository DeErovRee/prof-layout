Vue.component('cartstatus', {
    props: ['arr', 'visibility'],
    template: `
    <div class="circle" v-show="visibility">
        <div>{{ arr.length }}</div>
    </div>
    `
})