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
        ])
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
