<template>
	<div class="loading" v-show="!loading">
		<div>loading...</div>
	</div>
</template>
<script type="text/javascript">
export default {
	props: {
		loading: {
			type: Boolean,
			default: true
		}
	}
}

</script>
