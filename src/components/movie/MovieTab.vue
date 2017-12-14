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
    data() {
        return {
            oScrollView: this.$parent.$refs.scrollView
        }
    },
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
<style type="text/css">
.txt-slide-wrap {
    width: 100%;
    width: calc(100% - 20px);
    margin: 0 10px;
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
