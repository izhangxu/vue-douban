<template>
    <div class="wrap">
        <search-input ref="search-input" :show-picker="false" :search-params="searchParams" :default-value="defaultValue" @search-movies="searchMovies" />
        <div class="y_section" style="marginTop: 46px">
            <tab-txts ref="txtslide" :type-txts="options" @update-params="updateParams" />
            <div v-show="!isLoading">
                <item-list :movies-data="moviesData" />
            </div>
            <loading />
        </div>
        <tab-bar />
    </div>
</template>
<script>
import ItemList from './ItemList'
import SearchInput from './SearchInput'
import TabBar from './TabBar'
import TabTxts from './TabTxts'
import Loading from './Loading'
import { mapGetters } from 'vuex'

export default {
    name: 'search',
    data() {
        return {
            defaultValue: this.$route.query.word || '',
            options: [{
                cur: 0,
                txt: '综合',
                api: 'https://api.douban.com/v2/movie/search',
                params: {
                    count: 10
                }
            }, {
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
        TabBar,
        TabTxts,
        Loading
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading'
        })
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
                        this.$store.dispatch('loading', false);
                    }
                })
        },
        updateParams() {
            this.$store.dispatch('loading', true);
            this.fetchData();
        },
        searchMovies() {
            this.$store.dispatch('loading', true);
            this.setSelected(0);
            this.searchParams = this.options[0];
        },
        setSelected(index) {
            this.options = this.options.map((item, i) => {
                if (index == i) {
                    item.cur = 1
                } else {
                    item.cur = 0
                }
                return item;
            });
        },
        getCurTxtIndex() {
            return this.$refs.txtslide.getCurTxtIndex()
        }
    }
}

</script>
<style type="text/css">


</style>
