import { createStore } from 'vuex';

export default createStore({
   state: {
      userInfo: {
         id: '',
         username: '',
         animal: ''
      }
   },
   mutations: {
      updateUser(state, payload) {
         state.userInfo.id = payload.id;
         state.userInfo.username = payload.username;
         state.userInfo.animal = payload.animal;
      }
   },
   actions: {},
   modules: {}
});
