<template>
    <div class="wrap">
        <div class="ty_header">
            <div class="ty_head">
                <img class="ty_img" src="../../assets/logo.png"></img>
            </div>
            <div class="ty_bac"></div>
        </div>
        <div class="ty_main_list" v-if="subject.length">
            <template v-for="item in subject">
                <router-link :to="{ name: 'Detail', params: { id: item.id }}">
                    <div class="ty_list">
                        <div class="ty_list_tit clearfix">
                            <div class="tl">{{item.title}}</div>
                            <div class="tr car">已收藏</div>
                        </div>
                        <div class="ty_list_de clearfix">
                            <div class="tl">{{item.date | formatTime}}</div>
                            <div class="tr y_i ty_icon_right"></div>
                        </div>
                    </div>
                </router-link>
            </template>
        </div>
        <div class="ty_noOrder" v-else>
            <div class="ty_noOrder_text">没有收藏记录</div>
        </div>
        <tab-bar />
    </div>
</template>
<script type="text/javascript">
import _ from '../../libs/util'
import TabBar from '../footer/TabBar'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'admin',
    computed: {
        ...mapGetters({
            subject: 'collectList'
        })
    },
    components: {
        TabBar
    },
    filters: {
        formatTime: function(value) {
            if (!value) return
            return _.formatTime(value)
        }
    }
}

</script>