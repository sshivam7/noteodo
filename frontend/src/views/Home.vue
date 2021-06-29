<template>
   <div class="home">
      <div class="title-container">
         <img src="../assets/logo.png" alt="Noteodo Logo" />
         <h1>Noteodo</h1>
      </div>
      <h2>"Planning made easy"</h2>
      <standard-button text="Login" link="/login"></standard-button>
      <router-link class="link-to-page" to="/register"
         >Don't have an account? Register now
      </router-link>
   </div>
</template>

<script>
import StandardButton from '../components/buttons/StandardButton.vue';
export default {
   name: 'Home',
   components: {
      StandardButton
   },
   beforeMount() {
      if (this.$store.state.userInfo.id !== '') {
         this.$router.push('overview');
      }
   }
};
</script>

<style lang="scss">
.home {
   background: url('../assets/backgrounds/narrowmain.png') no-repeat center
      center fixed;
   background-size: cover;
   min-height: 100%;
   display: flex;
   flex-direction: column;

   .title-container {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-top: 20vh;

      img {
         height: 20vw;
         width: 15vw;
      }

      h1 {
         font: 22vw 'Passion One', cursive;
         color: $darkgrey;
         padding-left: 5px;
         margin: 0;
      }
   }

   h2 {
      color: $grey;
      font: 2em 'Roboto';
      margin: 0;
   }

   a {
      margin: 0 auto;
      margin-top: 10vh;
   }

   .link-to-page {
      position: absolute;
      bottom: 5px;
      right: 5px;
      padding: 4px;
      text-decoration: underline;
      font: 1.4em 'Roboto';
      color: $darkgrey;

      &:hover {
         color: white;
      }
   }
}

@media only screen and (min-width: 600px) {
   .home {
      background: url(../assets/backgrounds/main.png) no-repeat center center
         fixed;
      background-size: cover;

      .title-container {
         text-align: center;

         img {
            height: 15vw;
            width: 10vw;
         }

         h1 {
            font-size: 15vw;
         }

         h2 {
            font-size: 2.5em;
         }
      }
   }

   //TODO add support for phone screens
}
</style>
