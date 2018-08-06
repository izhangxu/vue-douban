<template>
  <div class="wrap y_bg01">
    <div class="y_txtBox">
      <div class="t1">电影免费查 新片随时议</div>
    </div>
    <div class="y_inpuBox">
      <div class="y_searchBox">
        <div class="y_search">
          <input class="y_inp"
            ref="indexInput" />
          <input type="button"
            value="查   找"
            class="y_btn"
            @click="goSearchPage">
        </div>
      </div>
    </div>
    <div class="y_section">
      <div class="y_tit">即将上映</div>
      <div style="margin: 0 10px;">
        <movie-list />
        <div style="height:47px;"></div>
      </div>
    </div>
    <tab-bar />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import MovieList from '../movie/MovieList';
import TabBar from '../footer/TabBar';

export default {
  name: 'index',
  components: {
    MovieList,
    TabBar,
  },
  created() {
    this.switchSearchApi(2);
    this.getMoviesRequest();
    this.getMovies().then((data) => {
      this.getMoviesSuccess(data);
    }).catch(() => {
      this.getMoviesFailure();
    });
  },
  methods: {
    ...mapActions([
      'getMovies',
      'getMoviesRequest',
      'getMoviesSuccess',
      'getMoviesFailure',
      'switchSearchApi',
      'storageInputValue',
    ]),
    goSearchPage() {
      this.$router.push({ path: 'movie' });
      this.storageInputValue(this.$refs.indexInput.value);
    },
  },
};

</script>
