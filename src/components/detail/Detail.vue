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
