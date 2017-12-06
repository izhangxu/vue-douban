<template>
    <div class="wrap">
        <div class="ty_header">
            <div class="ty_head">
                <image class="ty_img" src=""></image>
            </div>
        <div class="ty_bac"></div>
        </div>
        <div class="ty_noOrder" v-if="!subject">
            <div class="y_i ty_icon_noOrder"></div>
            <div class="ty_noOrder_text">没有收藏记录</div>
        </div>
        <div class="ty_main_list" v-if="subject">
            <template v-for="item in subject">
                <router-link :to="{ name: 'Detail', params: { id: item.id }}">
                    <div class="ty_list">
                        <div class="ty_list_tit clearfix">
                            <div class="tl">{{item.title}}</div>
                            <div class="tr car">已收藏</div>
                        </div>
                        <div class="ty_list_de clearfix">
                            <div class="tl">{{item.date}}</div>
                            <div class="tr y_i ty_icon_right"></div>
                        </div>
                    </div>
                </router-link>
            </template>
        </div>
        <footer-Box />
    </div>
</template>
<script type="text/javascript">
import {
    cookie
} from 'cookie_js'
import util from '../lib/util'
import FooterBox from './FooterBox'

export default {
    data() {
        return {
            subject: null,
            footerCur: '我的'
        }
    },
        created() {
            this.getData()
        },
        watch: {
            '$route': 'getData'
        },
        components: {
            FooterBox
        },
        methods: {
            getData() {
                let co = cookie.get('key').replace(/^_*/, '')
                let arr = co.split('___')
                arr = arr[0] ? arr.map((item) => {
                    let newArr = item.split('|');
                    return {
                        id: newArr[0],
                        title: newArr[1],
                        date: util.formatTime(newArr[2])
                    }

                }) : null
                this.subject = arr
            }
        }
}
</script>
<style type="text/css">
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.ty_header {
    padding: 45px 0 81px;
    background-color: #ffc823;
    position: relative;
}

.ty_head {
    width: 60px;
    height: 60px;
    border: 1px solid #ffdc72;
    border-radius: 30px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, .12);
    position: relative;
    z-index: 2;
    overflow: hidden;
}

.ty_head .ty_img {
    width: 60px;
    height: 60px;
}

.ty_header .ty_bac {
    content: ".";
    display: block;
    background-image: url(http://src.leju.com/imp/imp/deal/78/a4/7/33658b17b275748545379e923c6_p49_mk45.png);
    position: absolute;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    width: 100%;
    height: 70px;
    background-size: 750px 70px;
    z-index: 1;
}

.ty_main_list {
    padding: 3px 0 0 10px;
    background-color: #fff;
}

.ty_list {
    /*line-height: 22px;*/
    padding: 5px 10px 7px 0;
    border-bottom: 1px solid #f5f6fa;
}

.ty_list .tl {
    float: left;
}

.ty_list .tr {
    float: right;
}

.ty_list_tit .tl {
    color: #1d334a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ty_list_tit .tr {
    /*font-size: 22px;*/
}

.ty_list_tit .car {
    color: #ffa200;
    font-size: 12px;
}

.ty_list_de {
    margin-top: 8px;
}

.ty_list_de .tl {
    /*font-size: 24px;*/
    color: #c7ced9;
}

.ty_icon_right {
    background-position: -381px 0;
    width: 13px;
    height: 23px;
}

.ty_noOrder {
    background-color: #fff;
    padding: 28px 0 20px;
    text-align: center;
}

.ty_icon_noOrder {
    display: block;
    background-position: 0 -144px;
    width: 276px;
    height: 98px;
    margin: 0 auto;
}

.ty_noOrder_text {
    text-align: center;
    color: #c7c7c7;
    font-size: 16px;
    margin-top: 20px;
}

.ty_noOrder_btn {
    display: inline-block;
    margin: 0 auto;
    color: #714c12;
    /*font-size: 28px;*/
    line-height: 22px;
    padding: 0 30px;
    background-color: #ffc823;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(254, 176, 75, .12);
    margin-top: 38px;
}
</style>
