<template>
    <div class="y_toolbar">
        <div :class="[{on: item.cur}, y_row]" v-for="(item, index) in newTxts" @click="selected(index)">
            <a :href="item.href" target="_self">
                <img class="y_toolic1_01" src="../assets/logo.png" />
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
            y_row: 'y_row',
            txts: [{
                txt: '首页',
                href: '/#/',
                cur: 0
            }, {
                txt: '电影',
                href: '/#/search',
                cur: 0
            }, {
                'txt': '我的',
                cur: 0
            }],
        }
    },
    computed: {
        newTxts () {
            return this.txts.map((item)=>{
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
.y_toolbar .y_row img {
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

.y_toolbar .on {
    background: #ffe600;
}

.y_toolbar .on .txt {
    color: #425571
}

.y_toolic1_01,
.y_toolic2_01,
.y_toolic3_01 {
    display: block
}
</style>
