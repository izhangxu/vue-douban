<template>
    <div class="wrap">
        <search-input :show-picker="false" :search-params="searchParams" :default-value="defaultValue" @search-movies="searchMovies"></search-input>
        <div class="y_section" :style="styleObject">
            <txt-slide :type-txts="options" v-if="true" @update-params="updateParams"></txt-slide>
            <item-list :movies-data="moviesData"></item-list>
        </div>
        <footer-Box :footer-cur="footerCur"></footer-box>
    </div>
</template>
<script>
import ItemList from '../components/ItemList'
import SearchInput from '../components/SearchInput'
import FooterBox from '../components/FooterBox'
import TxtSlide from '../components/TxtSlide'
import util from '../lib/util'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {
    name: 'search',
    data() {
        return {
            defaultValue: this.$route.query.word || '',
            styleObject: {
                marginTop: '46px'
            },
            footerCur: '电影',
            options: [{
                cur: 0,
                txt: '综合',
                api: 'https://api.douban.com/v2/movie/search',
                params: {
                    count: 10
                }
            },{
                cur: 1,
                txt: '正在热映',
                api: 'https://api.douban.com/v2/movie/in_theaters',
                params: {
                    count: 10
                }
            }, {
                cur: 0,
                txt: '即将上映',
                api: 'https://api.douban.com/v2/movie/coming_soon',
                params: {
                    count: 10
                }
            }, {
                cur: 0,
                txt: 'Top250',
                api: 'https://api.douban.com/v2/movie/top250',
                params: {
                    count: 10
                }
            }, {
                cur: 0,
                txt: '北美票房榜',
                api: 'https://api.douban.com/v2/movie/us_box',
                params: {
                    count: 10
                }
            }],
            moviesData: [],
            searchParams: {}
        }
    },
    components: {
        ItemList,
        SearchInput,
        FooterBox,
        TxtSlide
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            let curOption = this.options.filter((item) => {
                if (item.cur) {
                    return true;
                }
            })
            this.searchParams = curOption[0];
            this.$http({
                    url: curOption[0].api,
                    method: 'jsonp',
                    params: {
                        count: 10
                    }
                })
                .then(function(res) {
                    let data = JSON.parse(res.bodyText);
                    if (data.total > 0 || data.date) {
                        // console.log(data.subjects)
                        this.moviesData = data.subjects;
                        this.moviesData = this.moviesData.map((item) => {
                            if (item.subject) {
                                return item.subject
                            } else {
                                return item
                            }
                        })
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
        updateParams() {
            this.fetchData();
        },
        searchMovies() {
            this.setSelected(0);
            this.searchParams = this.options[0];
        },
        setSelected (index) {
            this.options = this.options.map((item, i)=>{
                if (index == i) {
                    item.cur = 1
                } else {
                    item.cur = 0
                }
                return item;
            });
        }
    }
}
</script>
<style type="text/css">

</style>
