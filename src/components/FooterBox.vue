<template>
    <div class="y_toolbar">
        <div class="y_row" v-for="(item, index) in newTxts" @click="selected(index)">
            <a :href="item.href" target="_self">
                <i :class="{footer_icon_01: item.icon[0], on: item.cur, footer_icon_02: item.icon[1], footer_icon_03: item.icon[2]}"></i>
                <div class="txt">{{item.txt}}</div>
            </a>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: ['footerCur'],
    data() {
        return {
            txts: [{
                txt: '首页',
                href: '/#/',
                icon: [1, 0, 0],
                cur: 0
            }, {
                txt: '电影',
                href: '/#/movie',
                icon: [0, 1, 0],
                cur: 0
            }, {
                'txt': '我的',
                href: '/#/admin',
                icon: [0, 0, 1],
                cur: 0
            }],
        }
    },
    computed: {
        newTxts() {
            return this.txts.map((item) => {
                if (item.txt == this.footerCur) {
                    item.cur = 1;
                } else {
                    item.cur = 0;
                }
                return item;
            })
        }
    },
    methods: {
        selected(index) {
            let txts = this.txts;
            txts.forEach((item, i) => {
                if (i == index) {
                    item.cur = 1;
                } else {
                    item.cur = 0
                }
            })
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
