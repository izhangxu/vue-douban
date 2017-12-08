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
    computed: {
        ...mapGetters([
            'inputValue',
            'isLoading'
        ])
    },
    created: function() {
        this.$store.dispatch('selectTabBar', 1);
        if (this.inputValue == '') {
            this.$store.dispatch('switchSearchApi', 1);
            this.$store.dispatch('switchTabIndex', 1);
            this.$store.dispatch('getMovies')
        } else {
            this.$store.dispatch('switchSearchApi', 0);
            this.$store.dispatch('switchTabIndex', 0);
        }
    }
}

</script>
