<template>
    <div class="y_list">
        <div class="row" v-for="item in movieListData">
            <router-link :to="{ name: 'Detail', params: { id: item.id }}">
                <div class="y_img">
                    <img :src="getImage(item.images.small)"></img>
                </div>
                <div class="y_txt">
                    <div class="t1">{{item.title}}</div>
                    <div class="t2">主演：{{item.newCasts}}</div>
                    <div class="t3">{{item.genres.join(',')}}</div>
                </div>
                <div class="y_yue">{{item.rating.average}}分</div>
            </router-link>
        </div>
        <slot name="load"></slot>
    </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'inputValue',
            'movieListData'
        ])
    },
    methods: {
        ...mapActions([
            'getMovies',
            'getMoviesSuccess',
            'getMoviesFailure',
            'switchSearchApi'
        ]),
        getImage(url) {
            if (url !== undefined) {
                return url.replace(/http\w{0,1}:\/\/(.)/g, 'https://images.weserv.nl/?url=$1');
            }
        }
    }
}

</script>
<style type="text/css">
.y_list .row {
    padding: 10px 0 10px 0;
    overflow: hidden;
    border-bottom: solid 1px #f2f3f7;
    position: relative
}

.y_list .row a {
    text-decoration: none;
}

.y_list .row .y_img {
    width: 90px;
    height: 126px;
    float: left;
    position: relative
}

.y_list .row .y_img img {
    width: 100%;
    height: 100%;
    display: block
}

.y_list .row .y_txt {
    overflow: hidden;
    padding: 0 80px 0 14px;
    text-align: left
}

.y_list .row .y_txt .t1 {
    font-size: 16px;
    overflow: hidden;
    color: #1d334a
}

.y_list .row .y_txt .t2 {
    font-size: 12px;
    overflow: hidden;
    color: #34495e;
}

.y_list .row .y_txt .t3 {
    font-size: 12px;
    margin-top: 2px;
    overflow: hidden;
    color: #ffa200;
}

.y_list .row .y_yue {
    position: absolute;
    width: 34px;
    height: 34px;
    line-height: 34px;
    box-shadow: 3px 7px 7px rgba(252, 200, 26, 0.3);
    right: 30px;
    font-size: 12px;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 100%;
    text-align: center;
    color: #34495e;
}

</style>
