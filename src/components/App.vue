<template>
    <div class="wrap y_bg01">
        <div class="y_txtBox">
            <div class="t1">电影免费查 新片随时议</div>
        </div>
        <div class="y_inpuBox">
            <div class="y_searchBox">
                <div class="y_search">
                    <input class="y_inp" v-model="keyword" />
                    <input type="button" value="查   找" class="y_btn" @click="goSearchPage">
                </div>
            </div>
        </div>
        <div class="y_section">
            <div class="y_tit">即将上映</div>
            <item-list :movies-data="moviesData" />
        </div>
        <footer-Box />
    </div>
</template>
<script>
import ItemList from './ItemList'
import FooterBox from './FooterBox'

export default {
    name: 'app',
    components: {
        ItemList,
        FooterBox,
    },
    data() {
        return {
            footerCur: '首页',
            api: {
                api: 'https://api.douban.com/v2/movie/coming_soon',
                params: {
                    count: 10
                }
            },
            moviesData: [],
            keyword: ''
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let p = this.api;
            this.$http({
                    url: p.api,
                    method: 'jsonp',
                    params: p.params
                })
                .then(function(res) {
                    let data = JSON.parse(res.bodyText);
                    if (data.total > 0 || data.date) {
                        // console.log(data.subjects)
                        this.moviesData = data.subjects;
                        this.moviesData = this.moviesData.map((item) => {
                            if (item.casts.length) {
                                item.newCasts = [];
                                item.casts.forEach((k) => {
                                    item.newCasts.push(k.name)
                                })
                                item.newCasts = item.newCasts.join('、')
                                return item;
                            } else {
                                return item;
                            }
                        })
                    }
                })
        },
        goSearchPage() {
            let word = this.keyword
            this.$router.push({ path: 'movie', query: { word: word } });
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
