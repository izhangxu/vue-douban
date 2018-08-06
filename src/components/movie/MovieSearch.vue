<template>
  <div class="y_shBox">
    <div class="y_search">
      <input :class="[{on: movieSearchClear} ,'y_inp']"
        v-model="inputValue"
        @input="updateValue($event.target.value)"
        @focus="cacheMovieTab" />
      <button class="y_subtn"
        @click="clearInputValue">清 空</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex';
import _ from '../../libs/util';

export default {
  computed: {
    ...mapGetters([
      'inputValue',
      'movieSearchClear',
    ]),
  },
  created() {
    if (this.inputValue) {
      this.disableScroll(true);
      this.changeLoadTxt('');
      this.switchMovieTab(0);
    } else {
      this.switchMovieTab(1);
    }
    this.fetchMovies(this.inputValue);
  },
  methods: {
    ...mapActions([
      'switchMovieTab',
      'cacheMovieTab',
      'clearMovies',
      'storageInputValue',
      'getMovies',
      'getMoviesSuccess',
      'getMoviesFailure',
      'changeLoadTxt',
      'disableScroll',
    ]),
    // 清空状态
    recoverState() {
      this.clearMovies();
      this.getMovies()
        .then((data) => {
          this.getMoviesSuccess(data);
        })
        .catch(() => {
          this.getMoviesFailure();
        });
    },
    // 清空
    clearInputValue() {
      this.recoverState();
    },
    // 综合搜索
    fetchMovies(val) {
      const searchParams = val ? {
        params: {
          q: val,
        },
      } : {};
      this.getMovies(searchParams)
        .then((data) => {
          this.getMoviesSuccess(data);
        })
        .catch(() => {
          this.getMoviesFailure();
        });
    },
    // 获取数据
    fetchData: _.debounce(function s(val) {
      this.fetchMovies(val);
    }, 500),
    // 输入监听
    updateValue(val) {
      if (val !== '') {
        const oScrollView = this.$parent.$refs.scrollView;
        if (oScrollView) {
          oScrollView.scrollTo(0, 0);
          this.disableScroll(true);
        }
        this.switchMovieTab(0);
        this.changeLoadTxt('');
      } else {
        this.recoverState();
      }
      this.storageInputValue(val);
      this.fetchData(val);
    },
  },
};

</script>
