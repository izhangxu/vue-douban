<template>
    <div class="y_toolbar">
        <div class="y_row" v-for="(item, index) in list">
            <router-link :to="{ name: item.name, params: { id: item.id }}">
                <i :class="[item.class, {on: item.cur}]"></i>
                <div class="txt">{{item.txt}}</div>
            </router-link>
        </div>
    </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'tabBar',
    computed: {
        ...mapGetters({
            list: 'list'
        })
    },
    methods: {
        ...mapActions([
            'initTabBar'
        ])
    },
    created() {
        this.initTabBar()
    }
}

</script>
