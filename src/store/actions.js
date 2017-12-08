import * as types from './mutation-types'

export const loading = ({ commit }, status) => {
	commit(types.LOADING_STATUS, {
		status
	});
}

export const storageInputValue = ({ commit }, value) => {
	commit(types.STORAGE_INPUT_VALUE, value);
}

export const clearInputValue = ({ commit }) => {
	commit(types.CLEAR_INPUT_VALUE);
}

export const switchSearchApi = ({ commit }, index) => {
	index = index === undefined ? 0 : index
	commit(types.SWITCH_SEARCH_API, index)
}
