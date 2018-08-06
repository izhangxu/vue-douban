<template>
  <div class="wrap">
    <movie-search />
    <div class="y_section"
      style="marginTop: 46px">
      <movie-tab />
      <scroll-view ref="scrollView"
        :data="movieListData"
        :pullup="pullup"
        @pullup="loadMovies"
        v-show="!isLoading">
        <movie-list>
          <div slot="load"
            class="load"
            v-show="loadTxt">{{loadTxt}}</div>
        </movie-list>
      </scroll-view>
      <loading />
    </div>
    <tab-bar />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import MovieSearch from './MovieSearch';
import MovieTab from './MovieTab';
import MovieList from './MovieList';
import TabBar from '../footer/TabBar';
import Loading from '../common/Loading';
import ScrollView from '../common/ScrollView';

export default {
  name: 'movie',
  data() {
    return {
      pullup: true,
    };
  },
  components: {
    MovieSearch,
    MovieTab,
    MovieList,
    TabBar,
    Loading,
    ScrollView,
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'movieListData',
      'scrollDisabled',
      'loadTxt',
    ]),
  },
  created() {
    this.getMoviesRequest();
    this.changeLoadTxt('加载中...');
  },
  methods: {
    ...mapActions([
      'getMovies',
      'getMoviesRequest',
      'getMoviesSuccess',
      'getMoviesFailure',
      'disableScroll',
      'changeLoadTxt',
    ]),
    loadMovies() {
      if (!this.scrollDisabled) {
        const searchParams = {
          params: {
            start: this.movieListData.length,
          },
        };
        this.getMovies(searchParams)
          .then((data) => {
            if (data.length < 10) {
              this.changeLoadTxt('无更多数据');
              this.disableScroll(true);
            }
            data = this.movieListData.concat(data);
            this.getMoviesSuccess(data);
          })
          .catch(() => {
            this.getMoviesFailure();
          });
      }
    },
  },
};

</script>
