<template>
   <router-view />
</template>

<script>
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
   name: 'App',
   watch: {
      // eslint-disable-next-line no-unused-vars
      $route(to, from) {
         document.title = to.meta.title || 'Noteodo';
      }
   },
   async beforeCreate() {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
         localStorage.setItem('auth-token', '');
         token = '';
      }
      const tokenResponse = await Axios.post(
         'http://localhost:3000/user/isValidToken',
         null,
         {
            headers: { Authorization: token }
         }
      );
      if (tokenResponse.data) {
         const payload = jwtDecode(token);
         this.$store.commit('updateUser', payload);
      }
   }
};
</script>

<style lang="scss">
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   height: 100%;
}
</style>
