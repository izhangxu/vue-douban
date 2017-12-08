<template>
    <div class="wrap">
        <search-input />
        <div class="y_section" style="marginTop: 46px">
            <movie-tab />
            <div v-show="!isLoading">
                <movie-list />
            </div>
            <loading />
        </div>
        <tab-bar />
    </div>
</template>
<script>
import MovieList from './MovieList'
import SearchInput from './SearchInput'
import TabBar from './TabBar'
import MovieTab from './MovieTab'
import Loading from './Loading'
import { mapGetters } from 'vuex'

export default {
    name: 'movie',
    components: {
        MovieList,
        SearchInput,
        TabBar,
        MovieTab,
        Loading
    },
    beforeCreate: function(){
        this.$store.dispatch('switchTabIndex' ,1);
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading'
        })
    }
}

</script>
<style type="text/css">


</style>
