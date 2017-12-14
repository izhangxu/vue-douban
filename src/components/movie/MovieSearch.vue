<template>
    <div class="y_shBox">
        <div class="y_search">
            <input :class="[{on: movieSearchClear} ,'y_inp']" v-model="inputValue" @input="updateValue($event.target.value)" @focus="cacheMovieTab" />
            <button class="y_subtn" @click="clearInputValue">清 空</button>
        </div>
    </div>
</template>
<script type="text/javascript">
import _ from '../../libs/util'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            oScrollView: this.$parent.$refs.scrollView
        }
    },
    computed: {
        ...mapGetters([
            'inputValue',
            'movieSearchClear'
        ])
    },
    created() {
        this.switchMovieTab(this.inputValue ? 0 : 1)
        this.fetchMovies(this.inputValue)
    },
    watch: {
        'inputValue': (val) => {
            if (val) {
                this.switchMovieTab(0)
                this.changeLoadTxt('')
                if (this.oScrollView) {
                    this.oScrollView.scrollTo(0, 0)
                    this.disableScroll(true)
                }
            } else {
                this.recoverState()
            }
        }
    },
    methods: {
        ...mapActions([
            'switchMovieTab',
            'cacheMovieTab',
            'clearMovies',
            'storageInputValue',
            'getMovies',
            'getMoviesSuccess',
            'getMoviesFailure'
        ]),
        // 清空状态
        recoverState() {
            this.clearMovies()
            this.getMovies()
                .then(data => {
                    this.getMoviesSuccess(data);
                })
                .catch(e => {
                    this.getMoviesFailure();
                })
        },
        // 清空
        clearInputValue() {
            this.recoverState()
        },
        // 综合搜索
        fetchMovies(val) {
            const searchParams = val ? {
                params: {
                    q: val
                }
            } : {};
            this.getMovies(searchParams)
                .then(data => {
                    this.getMoviesSuccess(data);
                })
                .catch(e => {
                    this.getMoviesFailure();
                })
        },
        // 获取数据
        fetchData: _.debounce(function(val) {
            this.fetchMovies(val)
        }, 500),
        // 输入监听
        updateValue: function(val) {
            this.storageInputValue(val)
            this.fetchData(val)
        }
    }
}

</script>
<style type="text/css">
.y_shBox {
    background: #f7f8fc;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}

.y_shBox .y_search {
    overflow: hidden;
    position: relative;
    margin: 10px 20px 10px 20px;
}

.y_shBox .y_search .y_inp {
    height: 24px;
    line-height: 24px;
    width: 98%;
    display: block;
    color: #1d334a;
    padding-left: calc(2% - 2px);
    float: left;
    border: solid 1px #f2f3f7;
    transition: width .3s;
    -moz-transition: width .3s;
    -webkit-transition: width .3s;
    -o-transition: width .3s;
}

.y_shBox .y_search .y_inp.on {
    width: 78%
}

.y_shBox .y_search .y_subtn {
    width: 18%;
    height: 26px;
    border: 0 none;
    border-radius: 0px 3px 3px 0px;
    background: #ffe600;
    position: absolute;
    color: #714c12;
}

.y_shBox .y_search .y_clear {
    width: 70px;
    height: 64px;
    position: absolute;
    top: 0;
    right: 0
}

.y_tabBox {
    font-size: 2em;
    z-index: 999;
    position: relative;
}

</style>
