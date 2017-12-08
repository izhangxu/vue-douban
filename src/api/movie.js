import axios from 'axios'

export default {
	getMovies (searchApi, options) {
		// const api = getApi(tabIndex)
		return axios.get(searchApi.url, {
			params: Object.assign({}, searchApi.params, options)
		}).then(res => {
			return Promise.resolve(res.data);
		}).catch(err => {
			return Promise.reject(err);
		})
	}
};
