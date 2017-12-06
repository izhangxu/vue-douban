import * as types from './mutation-types'

export default {
	[types.LOADING_STATUS] (state, opt) {
		state.isLoading = opt.status;
	}
}