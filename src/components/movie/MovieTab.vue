<template>
    <div class="txt-slide-wrap">
        <ul>
            <li :class="{on: item.cur }" :style="movieTabStyle" v-for="(item, index) in movieTabData" @click="selectTab(index)">{{item.txt}}</li>
        </ul>
    </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'movieTabData',
            'movieTabStyle',
            'movieTabIndex'
        ])
    },
    methods: {
        ...mapActions([
            'toggleLoading',
            'switchMovieTab',
            'getMovies',
            'getMoviesSuccess',
            'getMoviesFailure',
            'disableScroll',
            'changeLoadTxt',
            'clearInputValue'
        ]),
        selectTab(index) {
            if (index && index != this.movieTabIndex) {
                const oScrollView = this.$parent.$refs.scrollView
                this.switchMovieTab(index)
                this.clearInputValue()
                if (oScrollView) {
                    oScrollView.scrollTo(0, 0)
                    this.disableScroll(index == 4 ? true : false)
                    this.changeLoadTxt(index == 4 ? '' : '加载中...')
                }
                this.toggleLoading(true)
                this.getMovies()
                    .then(data => {
                        this.getMoviesSuccess(data)
                    })
                    .catch(e => {
                        this.getMoviesFailure()
                    })
                    .finally(() => {
                        this.toggleLoading(false)
                    })
            }
        }
    }
}

</script>
