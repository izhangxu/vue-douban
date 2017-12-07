<template>
    <div class="wrap">
        <search-input />
        <div class="y_section" style="marginTop: 46px">
            <movie-tab />
            <div v-show="!isLoading">
                <item-list />
            </div>
            <loading />
        </div>
        <tab-bar />
    </div>
</template>
<script>
import ItemList from './ItemList'
import SearchInput from './SearchInput'
import TabBar from './TabBar'
import MovieTab from './MovieTab'
import Loading from './Loading'
import { mapGetters } from 'vuex'

export default {
    name: 'movie',
    components: {
        ItemList,
        SearchInput,
        TabBar,
        MovieTab,
        Loading
    },
    beforeCreate: function(){
        this.$store.dispatch('selectTab' ,1);
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading',
            defaultValue: 'defaultValue',
            movieTabsData: 'movieTabsData'
        })
    }
}

</script>
<style type="text/css">


</style>
