import Vue from 'vue';

/* eslint-disable-next-line */
Promise.prototype.finally = function (callback) {
  const P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason; }),
  );
};

export default {
  getMovies(searchApi, options) {
    return Vue.http.jsonp(searchApi.url, {
      params: Object.assign({}, searchApi.params, options),
    }).then(res => Promise.resolve(res.body), err => Promise.reject(err));
  },
  getDetail(id) {
    return Vue.http.jsonp(`/v2/movie/subject/${id}`)
      .then(res => Promise.resolve(res.body), e => Promise.resolve(e));
  },
  getCelebrity(id) {
    return Vue.http.jsonp(`/v2/movie/celebrity/${id}`)
      .then(res => Promise.resolve(res.body), e => Promise.resolve(e));
  },
};
