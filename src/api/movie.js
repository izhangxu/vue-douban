import axios from 'axios'

const ajaxApi = [{
	index: 0,
	url: '/v2/movie/search',
	params: {
		count: 10
	}
}, {
	index: 1,
	url: '/v2/movie/in_theaters',
	params: {
		count: 10
	}
}, {
	index: 2,
	url: '/v2/movie/coming_soon',
	params: {
		count: 10
	}
}, {
	index: 3,
	url: '/v2/movie/top250',
	params: {
		count: 10
	}
}, {
	index: 4,
	url: '/v2/movie/us_box',
	params: {
		count: 10
	}
}];

const getApi = (index) => {
	return ajaxApi.find(ele => ele.index == index);
};

export default {
	getMovies (tabIndex) {
		const api = getApi(tabIndex)
		return axios.get(api.url, {
			params: api.params
		}).then(res => {
			return Promise.resolve(res.data);
		}).catch(err => {
			return Promise.reject(err);
		})
	}
};
