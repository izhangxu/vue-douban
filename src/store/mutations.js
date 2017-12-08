import * as types from './mutation-types'
import { ajaxApi } from '../api/data';

export default {
	[types.LOADING_STATUS] (state, opt) {
		state.isLoading = opt.status;
	},
	[types.STORAGE_INPUT_VALUE] (state, value) {
		state.inputValue = value;
	},
	[types.CLEAR_INPUT_VALUE] (state) {
		state.inputValue = '';
	},
	[types.SWITCH_SEARCH_API](state, index) {
		state.movieSearchApi = ajaxApi[index];
	}
}