import Vue from 'vue'

Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => { throw reason })
	);
};

export default {
	getMovies(searchApi, options) {
		return Vue.http.jsonp(searchApi.url, {
			params: Object.assign({}, searchApi.params, options)
		}).then(res => {
			return Promise.resolve(res.body);
		}, err => {
			return Promise.reject(err);
		})
	},
	getDetail(id) {
		return Vue.http.jsonp('/v2/movie/subject/' + id)
			.then(res => {
				return Promise.resolve(res.body);
			}, e => {
				return Promise.resolve(e);
			})
	},
	getCelebrity(id) {
		return Vue.http.jsonp('/v2/movie/celebrity/' + id)
			.then(res => {
				return Promise.resolve(res.body);
			}, e => {
				return Promise.resolve(e);
			})
	},
};
