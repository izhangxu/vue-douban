<template>
    <div class="txt-slide-wrap">
        <ul>
            <li :class="{on: item.cur }" :style="movieTabsStyle" v-for="(item, index) in movieTabsData" @click="selectTab(index)">{{item.txt}}</li>
        </ul>
    </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'movieTabsData',
            'movieTabsStyle'
        ])
    },
    methods: {
        ...mapActions([
            'selectTab'
        ]),
        // 切换搜索条件（正在热映|即将上映|top250|北美票房榜）
        updateParams(index) {
            if (index == 0) {
                return;
            }
            this.txts = this.txts.map((item, i) => {
                if (i == index) {
                    item.cur = 1;
                } else {
                    item.cur = 0;
                }
                return item;
            })
            this.$emit('update-params', this.txts);
        },
        getCurTxtIndex() {
            let index;
            this.txts.forEach((item, i)=>{
                if (item.cur) {
                    index = i;
                }
            })
            return (index || 1)
        }
    }
}
</script>
<style type="text/css">
.txt-slide-wrap {
    width: 100%;
    height: 30px;
    padding-bottom: 10px;
    white-space: nowrap;
}

.txt-slide-wrap ul {
    height: 100%
}

.txt-slide-wrap ul li {
    float: left;
    height: 24px;
    line-height: 24px;
    padding: 3px 0px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
}

.txt-slide-wrap ul li.on {
    border-bottom: 2px solid #ffe600;
}
</style>
