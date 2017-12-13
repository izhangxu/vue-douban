<template>
    <div class="page">
        <div class="card" v-if="subject.id">
            <h1 class="title">{{subject.title}}</h1>
            <section class="subject-info">
                <div class="right">
                    <a href="javascript:;">
                        <img width="90" :src="subject.images.medium | handleImageUrl" :alt="subject.title" class="cover">
                    </a>
                </div>
                <div class="left">
                    <p class="rating">
                        <template v-if="subject.rating.average">
                            <span class="rating-stars" ref="stars"></span>
                            <strong>{{subject.rating.average}}</strong>
                        </template>
                        <span>{{subject.reviews_count}}人评价</span>
                        <span v-if="collected == true"><i class="collect-on" @click="collectMovie"></i>已收藏</span>
                        <span v-else="collected == false"><i class="collect" @click="collectMovie"></i>收藏</span>
                    </p>
                    <p class="meta">
                        上映时间-{{subject.year}}，上映地点-{{subject.newCountries}}，导演-{{subject.newDirectors}}，主演-{{subject.newCasts}}
                    </p>
                </div>
            </section>
            <section class="subject-intro" v-if="subject.summary">
                <h2>{{subject.title}}的剧情简介</h2>
                <div class="bd">
                    <p>{{subject.summary}}</p>
                </div>
            </section>
            <section class="subject-genres" v-if="subject.genres.length">
                <h2>电影类型</h2>
                <p>
                    <span v-for="item in subject.genres">{{item}}</span>
                </p>
            </section>
            <section class="subject-casts" v-if="subject.directors.length">
                <h2>导演</h2>
                <div class="casts-wrap">
                    <div class="casts-item" v-for="item in subject.directors">
                        <router-link :to="{ name: 'Celebrity', params: { id: item.id }}">
                            <img v-if="item.avatars" :src="item.avatars.medium | handleImageUrl" width="90" height="120">
                            <p class="name">姓名：{{item.name}}</p>
                            <p class="intro"><a :href="item.alt">豆瓣主页</a></p>
                        </router-link>
                    </div>
                </div>
            </section>
            <section class="subject-casts" v-if="subject.casts.length">
                <h2>主演列表</h2>
                <div class="casts-wrap">
                    <div class="casts-item" v-for="item in subject.casts">
                        <router-link :to="{ name: 'Celebrity', params: { id: item.id }}">
                            <img v-if="item.avatars" :src="item.avatars.medium | handleImageUrl" width="90" height="120">
                            <p class="name">姓名：{{item.name}}</p>
                            <p class="intro"><a :href="item.alt">豆瓣主页</a></p>
                        </router-link>
                    </div>
                </div>
            </section>
        </div>
        <loading />
    </div>
</template>
<script type="text/javascript">
import _ from '../../libs/util'
import Loading from '../common/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'detail',
    components: {
        Loading
    },
    computed:{
        ...mapGetters({
            subject: 'detailData',
            collected: 'collected'
        })
    },
    created() {
        this.getDetail()
        this.initCollectStats()
    },
    updated() {
        const starsEle = this.$refs.stars
        const average = this.subject.rating.average
        const num = Math.round(average)
        if (num) {
            starsEle.innerHTML = '<span class="smallstar' + num + ' smallstar"></span>'
        }
    },
    methods: {
        ...mapActions([
            'getDetail',
            'collectMovie',
            'initCollectStats'
        ])
    }
}

</script>
<style type="text/css">
.page {
    max-width: 650px;
    background: #fff;
    margin: 0 auto;
    overflow-x: hidden;
}

.subject-info {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
}

.subject-info .left {
    margin-right: 100px;
}

.subject-info .right {
    float: right;
}

.subject-info .left img {
    width: 100px;
}

.subject-info .rating {
    line-height: 18px;
}

.subject-info .rating strong {
    font-weight: normal;
    color: #494949;
    padding-right: 8px;
}

.subject-info .rating .collect {
    height: 18px;
    width: 18px;
    vertical-align: bottom;
    display: inline-block;
    background-image: url(../../assets/collect.png);
    background-size: cover;
}

.subject-info .rating .collect-on {
    height: 18px;
    width: 18px;
    vertical-align: bottom;
    display: inline-block;
    background-image: url(../../assets/collect-on.png);
    background-size: cover;
}

.subject-info .left .meta {
    margin-top: 15px;
    padding-right: 24px;
    font-size: 14px;
    line-height: 1.6;
}

.subject-casts .casts-wrap {
    overflow: hidden;
}

.subject-intro,
.subject-genres {
    margin-bottom: 30px;
}

.subject-intro .bd p {
    /*text-indent: 2em;*/
}

.subject-casts .casts-item {
    width: calc(100% / 2 - 5px);
    overflow: hidden;
    float: left;
    margin: 0 5px 20px 0;
    font-size: 13px;
    background: #f7f8fc;
}

.casts-item img {
    display: block;
    float: left;
}

.casts-item p {
    float: left;
    width: calc(100% - 103px);
    margin-left: 7px;
}

h1 {
    margin: 10px 0 5px;
    font-size: 24px;
    line-height: 32px;
    word-break: break-all;
}

h2 {
    color: #1d334a;
    margin: 0 0 15px;
    font-size: 15px;
}

section p {
    line-height: 22px;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
}

.subject-info .rating-stars {
    margin-right: 5px
}

.subject-genres p span {
    margin: 5px 10px 5px 0;
    font-size: 15px;
    line-height: 28px;
    padding: 0 12px;
    border-radius: 8px;
    text-align: center;
    color: #494949;
    background: #f5f5f5;
    display: inline-block;
}

</style>
