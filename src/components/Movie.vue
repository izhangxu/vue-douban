<template>
    <div class="wrap">
        <search-input ref="search-input" :show-picker="false" :search-params="searchParams" :default-value="defaultValue" @search-movies="searchMovies" />
        <div class="y_section" style="marginTop: 46px">
            <movie-tab ref="txtslide" :type-txts="movieTabsData" @update-params="updateParams" />
            <div v-show="!isLoading">
                <item-list :movies-data="moviesData" />
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
    data() {
        return {
            searchParams: {}
        }
    },
    components: {
        ItemList,
        SearchInput,
        TabBar,
        MovieTab,
        Loading
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading',
            defaultValue: 'defaultValue',
            movieTabsData: 'movieTabsData',
            moviesData: 'moviesData'
        })
    },
    mounted() {
        this.$store.dispatch('getMovies');
    },
    methods: {
        fetchData() {
            this.$store.dispatch('getMovies');
        },
        updateParams() {
            this.$store.dispatch('loading', true);
            // this.fetchData();
        },
        searchMovies() {
            this.$store.dispatch('loading', true);
            // this.setSelected(0);
            // this.searchParams = this.options[0];
        },
        setSelected(index) {
            // this.options = this.options.map((item, i) => {
            //     if (index == i) {
            //         item.cur = 1
            //     } else {
            //         item.cur = 0
            //     }
            //     return item;
            // });
        },
        getCurTxtIndex() {
            // return this.$refs.txtslide.getCurTxtIndex()
        }
    }
}

</script>
<style type="text/css">


</style>
