<template>
  <div class="y_list">
    <div class="row"
      v-for="item in movieListData"
      :key="item.id"
      @click="goDetailPage(item.id)">
      <div class="y_img">
        <img :src="item.images.small | handleImageUrl" />
      </div>
      <div class="y_txt">
        <div class="t1">{{item.title}}</div>
        <div class="t2">导演：{{item.newDirectors}}</div>
        <div class="t2">主演：{{item.newCasts}}</div>
        <div class="t3">{{item.genres.join(',')}}</div>
      </div>
      <div class="y_yue">{{item.rating.average}}分</div>
    </div>
    <slot name="load"></slot>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'movieListData',
    ]),
  },
  methods: {
    // better-scroll 冲突，router-link改为动态绑定
    goDetailPage(id) {
      this.$router.push({ path: `detail/${id}` });
    },
  },
};

</script>
