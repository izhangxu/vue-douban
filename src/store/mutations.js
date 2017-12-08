import * as types from './mutation-types'

export default {
	[types.LOADING_STATUS] (state, opt) {
		state.isLoading = opt.status;
	},
	[types.STORAGE_INPUT_VALUE] (state, value) {
		state.inputValue = value;
	},
	[types.CLEAR_INPUT_VALUE] (state) {
		state.inputValue = '';
	}
}