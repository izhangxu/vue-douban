<template>
    <div class="y_toolbar">
        <div class="y_row" v-for="(item, index) in list" @click="selected(index)">
            <router-link :to="{ name: item.name, params: { id: item.id }}">
                <i :class="[item.class, {on: item.cur}]"></i>
                <div class="txt">{{item.txt}}</div>
            </router-link>
        </div>
    </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            list: 'list'
        })
    },
    methods: {
        selected(index) {
            this.$store.dispatch('selected', index)
        }
    }
}

</script>
<style type="text/css">
.y_toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 999
}

.y_toolbar .y_row {
    float: left;
    width: 33.33%;
    height: 46px;
    border-top: solid 1px #fff
}

.y_toolbar .y_row a {
    text-decoration: none;
}

.y_toolbar .y_row i {
    width: 20px;
    height: 20px;
    padding-top: 3px;
    margin: 0 auto
}

.y_toolbar .y_row .txt {
    font-size: 12px;
    text-align: center;
    color: #425571;
    line-height: 24px;
    height: 24px
}





/*.y_toolbar .on {
    background: #ffe600;
}*/

.y_toolbar .on .txt {
    color: #425571
}

.footer_icon_01,
.footer_icon_02,
.footer_icon_03 {
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
}

.footer_icon_01.on {
    background-image: url(../assets/index-on.png);
}

.footer_icon_01 {
    background-image: url(../assets/index.png);
}

.footer_icon_02.on {
    background-image: url(../assets/movie-on.png);
}

.footer_icon_02 {
    background-image: url(../assets/movie.png);
}

.footer_icon_03.on {
    background-image: url(../assets/admin-on.png);
}

.footer_icon_03 {
    background-image: url(../assets/admin.png);
}

</style>
