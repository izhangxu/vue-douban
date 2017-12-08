import * as types from '../mutation-types'
import { data_footer } from '../../api/data';
import router from '../../router'

const state = {
	list: data_footer
};
// update
const getters = {
	list: (state, gatters, rootState) => {
		return state.list.map((item, i) => {
			item.cur = getPath(item.name.toLowerCase());
			return item;
		})
	}
};
// select
const actions = {
	selectTabBar(cxt, index) {
		cxt.commit(types.SELECT_TAB_BAR, {
			index
		});
	}
};

const mutations = {
	[types.SELECT_TAB_BAR](state, opt) {
		state.list.forEach((item, i) => {
			item.cur = i == opt.index ? true: false;
		})
	}
};

function getPath (p) {
	let sPath = window.location.pathname;
	if (sPath === '/') sPath += 'app';
	return sPath.split('/').find(ele => ele === p);
}

export default {
  state,
  getters,
  actions,
  mutations
}