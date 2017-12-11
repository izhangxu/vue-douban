import * as types from '../mutation-types'
import { data_footer } from '../../api/data';
import router from '../../router'

const state = {
	list: data_footer
};
// update
const getters = {
	list: state => state.list
};
// select
const actions = {
	initTabBar({commit}){
		commit(types.INIT_TAB_BAR);
	}
};

const mutations = {
	[types.INIT_TAB_BAR] (state) {
		state.list.forEach((item, i) => {
			item.cur = getPath(item.name.toLowerCase());
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