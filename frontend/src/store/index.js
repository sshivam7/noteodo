import { createStore } from 'vuex';

export default createStore({
   state: {
      userInfo: {
         id: '',
         username: ''
      }
   },
   mutations: {
      updateUser(state, payload) {
         state.userInfo.id = payload.id;
         state.userInfo.username = payload.username;
      }
   },
   actions: {},
   modules: {}
});
