<template>
    <div class="page">
        <div class="celebrity" v-show="loaded">
            <div class="base">
                <div class="cover">
                    <img :src="subject.avatars.medium" width="92" alt="周星驰">
                </div>
                <div class="r">
                    <h3>{{subject.name}}</h3>
                    <ul>
                        <li v-if="subject.name_en">英文名：{{subject.name_en}}</li>
                        <li v-if="subject.born_place">出生地：{{subject.born_place}}</li>
                    </ul>
                </div>
            </div>
            <div class="detail">
                <h2>主要参演作品</h2>
                <div class="cont movies">
                    <section class="ii return_name" v-for="item in subject.works">
                        <router-link :to="{ name: 'Detail', params: { id: item.subject.id }}">
                            <img class="delay" :src="item.subject.images.small">
                            <div class="r">
                                <p>{{item.subject.title}}</p>
                                <p class="gray">作品别名：{{item.subject.original_title}}</p>
                                <p class="roles">剧中身份：{{item.roles.join('、')}}</p>
                                <p class="rank" v-run="register('rank')" :data-average="item.subject.rating.average"></p>
                            </div>
                        </router-link>
                    </section>
                </div>
            </div>
            <div class="aka" v-if="subject.aka.length">
                <h2>其他称呼</h2>
                <span v-for="item in subject.aka">{{item}}</span>
            </div>
        </div>
        <div class="loading" v-show="!loaded">
            <div>loading...</div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
export default {
    data() {
            return {
                id: this.$route.params.id,
                subject: {
                    avatars: {},
                    aka: []
                },
                elements: [],
                loaded: false
            }
        },
        directives: {
            run: {
                inserted(el, binding) {
                    if (typeof binding.value === 'function') {
                        binding.value(el)
                    }
                }
            }
        },
        beforeMount() {
            this.fetchData()
        },
        updated() {
            let starsEle = this.elements
            starsEle.forEach((item) => {
                let num = Math.round(item.getAttribute('data-average'))
                if (num) {
                    item.innerHTML = '<span class="smallstar' + num + ' smallstar"></span>' + num + '分'
                }
            })
        },
        methods: {
            register(flag, num) {
                return (el) => {
                    this.elements.push(el);
                }
            },
            fetchData() {
                this.$http({
                        url: 'https://api.douban.com/v2/movie/celebrity/' + this.id,
                        method: 'jsonp',
                        params: {}
                    })
                    .then(function(res) {
                        let data = JSON.parse(res.bodyText);
                        if (data.id) {
                            this.subject = data
                        }
                        this.loaded = true
                    })
            }
        }
}
</script>
<style type="text/css">
.page {
    margin: 20px 0 40px 0;
    padding: 0 10px;
}

.celebrity .base {
    overflow: hidden;
}

.celebrity .base .cover {
    float: left;
    margin: 0 11px 8px 0;
    position: relative;
    width: 92px;
    height: 137px;
    overflow: hidden;
}

.celebrity .base .r {
    overflow: hidden;
}

.celebrity .base ul li {
    font-size: 12px;
    line-height: 18px;
}

.celebrity .movies {
    height: auto;
    overflow: hidden;
}

.celebrity .movies section {
    background: #f7f8fc;
    display: block;
    margin-bottom: 2px;
    padding: 10px;
    font-size: 14px;
    overflow: hidden;
}

.celebrity .movies .ii img {
    float: left;
    margin-right: 10px;
}

.celebrity .movies .ii .r {
    overflow: hidden;
}

.celebrity .movies p.gray {
    font-size: 12px;
    color: #aaa;
    margin-top: 3px;
}

.elebrity .movies p.rank {
    font-size: 12px;
    color: #F56D4C;
}

.celebrity .movies p.roles {
    font-size: 12px;
    margin-top: 3px;
}

.celebrity .aka {
    margin-top: 30px;
}

.celebrity .aka span {
    padding: 5px 15px 5px 0;
}
</style>
