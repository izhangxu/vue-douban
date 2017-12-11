<template>
    <div class="y_shBox">
        <div class="y_search">
            <input :class="[{on: movieSearchClear} ,'y_inp']" v-model="value" @input="updateValue($event.target.value)" @focus="cacheMovieTab" />
            <button class="y_subtn" @click="clearMovies">清 空</button>
        </div>
    </div>
</template>
<script type="text/javascript">
import _ from '../lib/util'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            flag: false
        }
    },
    computed: {
        ...mapGetters({
            value: 'inputValue',
            movieSearchClear: 'movieSearchClear'
        })
    },
    created() {
        if (this.value) {
            this.fetchMovies(this.value)
        }
    },
    methods: {
        ...mapActions([
            'cacheMovieTab'
        ]),
        recoverState() {
            this.$store.dispatch('clearMovies');
            this.$store.dispatch('getMovies')
            this.flag = false
        },
        clearMovies() {
            this.recoverState()
        },
        fetchMovies(val) {
            this.$store.dispatch('getMovies', {
                params: {
                    q: val
                }
            });
        },
        // 获取数据
        fetchData: _.debounce(function(val) {
            this.fetchMovies(val)
        }, 500),
        // 输入监听
        updateValue: function(val) {
            if (val !== '' && !this.flag) {
                this.flag = true;
                this.$store.dispatch('switchMovieTab', 0);
            }
            if (val === '') {
                this.recoverState()
            }
            this.$store.dispatch('storageInputValue', val)
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
