<template>
    <div class="wrap y_bg01">
        <div class="y_txtBox">
            <div class="t1">电影免费查 新片随时议</div>
        </div>
        <div class="y_inpuBox">
            <div class="y_searchBox">
                <div class="y_search">
                    <input class="y_inp" ref="indexInput" />
                    <input type="button" value="查   找" class="y_btn" @click="goSearchPage">
                </div>
            </div>
        </div>
        <div class="y_section">
            <div class="y_tit">即将上映</div>
            <movie-list />
        </div>
        <tab-bar />
    </div>
</template>
<script>
import MovieList from './MovieList'
import TabBar from './TabBar'

export default {
    name: 'app',
    components: {
        MovieList,
        TabBar,
    },
    methods: {
        goSearchPage() {
            this.$router.push({ path: 'movie'});
            this.$store.dispatch('storageInputValue', this.$refs.indexInput.value)
            this.$store.dispatch('selectTabBar', 1);
        }
    }
}

</script>
<style type="text/css">
.y_bg01 {
    background: url(http://src.leju.com/imp/imp/deal/6e/7d/8/3db10c0bfc7b159d1cc1160e940_p49_mk45.jpg) no-repeat;
    background-size: 100% auto;
    overflow: hidden
}

.y_txtBox {
    position: absolute;
    left: 40px;
    top: 22px
}

.y_txtBox .t1 {
    font-size: 14px;
    line-height: 60px;
    color: #463836;
    font-weight: bolder
}

.y_section {
    padding:0 15px;
    background: #fff
}

.y_tit {
    font-size: 14px;
    line-height: 36px;
    height: 36px;
    position: relative;
    padding-left: 20px;
    border-bottom: solid 1px #f2f3f7
}

.y_tit:after {
    content: '';
    position: absolute;
    width: 6px;
    height: 30px;
    background: #ffc823;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto
}

.y_tit .y_more {
    font-size: 12px;
    color: #c7cdd9;
    position: absolute;
    right: 30px;
    top: 0
}

.y_inpuBox {
    background: #fff;
    margin: 200px 30px 40px 30px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(209, 131, 20, 0.15);
}

.y_inpuBox .y_searchBox {
    border-bottom: solid 1px #eeeeee;
    overflow: hidden;
    padding: 20px 0;
}

.y_inpuBox .y_searchBox .y_search {
    overflow: hidden;
    position: relative;
    padding: 0 20px;
}

.y_inpuBox .y_searchBox .y_search .y_inp {
    height: 30px;
    line-height: 30px;
    width: calc(70% - 12px);
    padding-left: 10px;
    color: #c7ced9;
    border: solid 1px #f2f3f7;
    float: left;
}

.y_btn {
    background: #ffe118;
    color: #714c12;
    border-radius: 0 6px 6px 0;
    height: 32px;
    width: 30%;
    line-height: 32px;
    float: left;
}

.y_btn:after {
    display: none;
}

</style>
