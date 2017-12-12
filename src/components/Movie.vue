<template>
    <div class="wrap">
        <movie-search />
        <div class="y_section" style="marginTop: 46px">
            <movie-tab />
            <scroll-view :data="movieListData" :pullup="pullup" @pullup="loadData" v-show="!isLoading">
                <movie-list />
            </scroll-view>
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
import ScrollView from '../common/ScrollView'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'movie',
    data() {
        return {
            pullup: true
        }
    },
    components: {
        MovieSearch,
        MovieTab,
        MovieList,
        TabBar,
        Loading,
        ScrollView
    },
    computed: {
        ...mapGetters([
            'isLoading',
            'movieListData'
        ])
    },
    methods: {
        ...mapActions([
            'getMovies',
            'getMoviesSuccess',
            'getMoviesFailure'
        ]),
        loadData() {
            const searchParams = {
                params: {
                    start: this.movieListData.length
                }
            }
            this.getMovies(searchParams)
                .then(data => {
                    data = this.movieListData.concat(data);
                    this.getMoviesSuccess(data)
                }).catch(e => {
                    this.getMoviesFailure();
                })
        }
    }
}

</script>
