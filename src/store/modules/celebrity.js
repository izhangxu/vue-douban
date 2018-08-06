import * as types from '../mutation-types';
import service from '../../api/service';

const oState = {
  celebrityData: [],
};

const getters = {
  celebrityData: state => state.celebrityData,
};

const actions = {
  // 获取人物数据
  getCelebrity({
    commit,
    rootState,
  }) {
    // dispatch('toggleLoading', true)
    commit(types.GET_CELEBRITY_REQUEST);
    const { route } = rootState;
    if (route) {
      service.getCelebrity(route.params.id)
        .then((data) => {
          if (data.id) {
            commit(types.GET_CELEBRITY_SUCCESS, data);
          } else {
            commit(types.GET_CELEBRITY_FAILURE);
          }
          // dispatch('toggleLoading', false)
        })
        .catch(() => {
          commit(types.GET_CELEBRITY_FAILURE);
          // dispatch('toggleLoading', false)
        });
    }
  },
};

const mutations = {
  [types.GET_CELEBRITY_REQUEST](state) {
    state.celebrityData = [];
  },
  [types.GET_CELEBRITY_SUCCESS](state, data) {
    state.celebrityData = data;
  },
  [types.GET_CELEBRITY_FAILURE](state) {
    state.celebrityData = [];
  },
};

export default {
  state: oState,
  getters,
  actions,
  mutations,
};
