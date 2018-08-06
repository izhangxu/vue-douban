import * as types from '../mutation-types';
import { dataFooter } from '../../api/data';

const getPath = (p) => {
  let sPath = window.location.pathname;
  if (sPath === '/') sPath += 'app';
  return sPath.split('/').find(ele => ele === p);
};

const oState = {
  list: dataFooter,
};
// update
const getters = {
  list: state => state.list,
};
// select
const actions = {
  initTabBar({ commit }) {
    commit(types.INIT_TAB_BAR);
  },
};

const mutations = {
  [types.INIT_TAB_BAR](state) {
    state.list.forEach((item) => {
      item.cur = getPath(item.name.toLowerCase());
    });
  },
};


export default {
  state: oState,
  getters,
  actions,
  mutations,
};
