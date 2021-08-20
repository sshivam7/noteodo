<template>
   <div class="settings">
      <side-nav />
      <h2 class="alt-header-text">
         Noteodo:<span class="colored-text">Settings</span>
      </h2>
      <div class="settings-panel">
         <div class="logout-container">
            <button @click="$router.go(-1)" type="button">Back</button>
            <button @click="logout" class="colored-btn">Logout</button>
         </div>
      </div>
      <page-footer />
   </div>
</template>

<script>
import PageFooter from '../components/PageFooter.vue';

export default {
   name: 'Settings',
   components: { PageFooter },
   methods: {
      logout: function () {
         // Clear user data
         const clear = { id: '', username: '', animal: '' };
         this.$store.commit('updateUser', clear);
         localStorage.setItem('auth-token', '');

         // Reroute to homepage
         this.$router.push('home');
      }
   }
};
</script>

<style lang="scss">
.settings-panel {
   display: flex;
   align-items: center;
   justify-content: center;
   margin: auto;
   background-color: $lightgrey2;
   border-radius: 20px;
   width: 90vw;
   height: 80vh;
   margin-top: 5vh;
}
</style>
