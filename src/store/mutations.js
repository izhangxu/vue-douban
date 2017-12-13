import * as types from './mutation-types'
import { ajaxApi } from '../api/data'

export default {
	[types.TOGGLE_LOADING] (state, status) {
		state.isLoading = status;
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