import * as types from './mutation-types'

export const loading = (cxt, status) => {
	cxt.commit(types.LOADING_STATUS, {
		status
	});
}
