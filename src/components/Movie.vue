<template>
    <div class="wrap">
        <movie-search />
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
import MovieSearch from './MovieSearch'
import TabBar from './TabBar'
import MovieTab from './MovieTab'
import Loading from './Loading'
import { mapGetters } from 'vuex'

export default {
    name: 'movie',
    components: {
        MovieSearch,
        MovieTab,
        MovieList,
        TabBar,
        Loading
    },
    computed: {
        ...mapGetters([
            'inputValue',
            'isLoading'
        ])
    },
    created: function() {
        const inpVal = this.inputValue == '' ? true : false
        this.$store.dispatch('switchSearchApi', inpVal ? 1 : 0);
        this.$store.dispatch('switchTabIndex', inpVal ? 1 : 0);
        inpVal && this.$store.dispatch('getMovies')
    }
}

</script>
