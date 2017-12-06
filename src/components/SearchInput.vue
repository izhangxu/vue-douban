<template>
    <div class="y_shBox">
        <div class="y_search">
            <input :class="[{on: showClear} ,'y_inp']" @input="updateValue($event.target.value)" @focus="recordTxt"/>
            <button class="y_subtn" @click="clearValue">清 空</button>
        </div>
    </div>
</template>
<script type="text/javascript">
import _ from 'lodash'

export default {
    props: ['showPicker', 'searchParams', 'defaultValue'],
    data() {
        return {
            showClear: false,
            value: this.defaultValue,
            curTxtIndex: 1
        }
    },
    mounted() {
        if (this.value) {
            this.showClear = true;
            this.changeParams();
            this.fetchData(this.defaultValue);
        }
    },
    methods: {
        // 记录原始选中的txt的index
        recordTxt () {
            this.curTxtIndex = this.$parent.getCurTxtIndex() || 1
        },
        // 搜索
        updateValue (val) {
            this.showClear = val ? true : false
            this.changeParams()
            this.fetchData(val)
        },
        // 获取数据
        fetchData: _.debounce(function(val) {
            let api = this.searchParams;
            this.$http({
                    url: api.api,
                    method: 'jsonp',
                    params: _.assign({
                        q: val
                    }, api.params)
                })
                .then(function(res) {
                    let data = JSON.parse(res.bodyText);

                    if (data.subjects) {
                        // console.log(data.subjects)
                        this.$parent.moviesData = data.subjects;
                        this.$parent.loaded = true
                        if (!data.subjects.length) {
                            this.$parent.setSelected(this.curTxtIndex)
                            this.$parent.updateParams()
                        }
                    }
                })
        }, 500),
        // 更改搜索参数
        changeParams() {
            this.$emit('search-movies');
        },
        clearValue() {
            this.value = ''
            this.showClear = false
            this.$parent.moviesData = []
            this.$parent.setSelected(this.curTxtIndex)
            this.$parent.updateParams()
        }
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
