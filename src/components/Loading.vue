<template>
	<div class="loading" v-show="isLoading">
		<div>loading...</div>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
	computed: {
        ...mapGetters({
            isLoading: 'isLoading'
        })
    }
}

</script>
