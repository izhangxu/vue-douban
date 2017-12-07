<template>
    <div class="y_shBox">
        <div class="y_search">
            <input :class="[{on: showClear} ,'y_inp']" v-model="value" @input="updateValue($event.target.value)" @focus="recordTxt" />
            <button class="y_subtn" @click="clearMovies">清 空</button>
        </div>
    </div>
</template>
<script type="text/javascript">
import _ from 'lodash'
import { mapGetters,mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            value: 'defaultValue',
            showClear: 'showClear'
        })
    },
    create() {
        if (this.value) {
            this.$store.dispatch('toggleClear', true);
            this.$store.dispatch('selectTab', 0);
        }
    },
    methods: {
        ...mapActions([
            'clearMovies'
        ]),
        // 记录原始选中的txt的index
        recordTxt() {
            this.$store.dispatch('cacheTabIndex');
        },
        // 搜索
        updateValue(val) {
            this.$store.dispatch('toggleClear', val === '' ? false : true);
            this.fetchData(val)
        },
        // 获取数据
        fetchData: _.debounce(function(val) {
            this.$store.dispatch('getMovies', {
                params: {
                    q: val
                }
            });
        }, 500)
    },
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
