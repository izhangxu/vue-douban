import * as types from '../mutation-types'
import { data_footer } from '../../api/data';

const state = {
	txts: data_footer
};

const getters = {
	txts: state => state.txts
};

const actions = {
	selected(cxt, index) {
		cxt.commit(types.SELECT_TXTS, {
			index
		});
	}
};

const mutations = {
	[types.SELECT_TXTS](state, opt) {
		state.txts.forEach((item, i) => {
			item.cur = i == opt.index ? true: false;
		})
	}
};

export default {
  state,
  getters,
  actions,
  mutations
}