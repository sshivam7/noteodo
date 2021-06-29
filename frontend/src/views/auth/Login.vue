<template>
   <div class="login">
      <h2 class="header-text">
         Noteodo:<span class="colored-text">Login</span>
      </h2>
      <div class="login-container">
         <h1>Welcome Back</h1>
         <label for="email">Email</label>
         <input
            type="text"
            v-model="form.email"
            placeholder="Enter Email"
            name="email"
            required
         />

         <label for="password">Password</label>
         <input
            type="password"
            v-model="form.password"
            placeholder="Enter Password"
            name="password"
            required
         />

         <div class="error-container">
            <ul>
               <li v-for="(msg, index) in errMessages" :key="index">
                  {{ msg }}
               </li>
            </ul>
         </div>

         <div class="btn-container">
            <button @click="$router.go(-1)" type="button">Back</button>
            <button class="colored-btn" v-on:click="submitForm" type="submit">
               Login
            </button>
         </div>
      </div>
      <router-link class="link-to-page" to="/register"
         >Don't have an account? Register now
      </router-link>
      <page-footer />
   </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Axios from 'axios';

import PageFooter from '../../components/PageFooter.vue';

export default {
   name: 'Login',
   components: { PageFooter },
   data() {
      return {
         form: {
            email: '',
            password: ''
         },
         errMessages: []
      };
   },
   methods: {
      submitForm: async function () {
         try {
            // login user
            const loginResponse = await Axios.post(
               'http://localhost:3000/user/login',
               this.form
            );

            // Get and store user info from JWT payload
            const payload = jwtDecode(loginResponse.data.token);
            this.$store.commit('updateUser', payload);

            // Store user token
            localStorage.setItem('auth-token', loginResponse.data.token);
            this.$router.push('overview');
         } catch (err) {
            if (err.response.data.msg) {
               this.errMessages = err.response.data.msg;
            } else {
               this.errMessages.push('ERROR: Something went wrong');
            }
         }
      }
   },
   beforeMount() {
      if (this.$store.state.userInfo.id !== '') {
         this.$router.push('overview');
      }
   }
};
</script>

<style lang="scss">
.login {
   display: flex;
   align-items: center;
   justify-content: center;
}
.login-container {
   position: relative;
   border-radius: 20px;
   margin-top: 15vh;
   width: 350px;
   height: 500px;
   background: $lightgrey2;
   display: flex;
   flex-direction: column;
}

h1 {
   font: $headline1;
   color: $darkgrey;
}

label {
   padding: 5px 20px;
   text-align: left;
   display: block;
   color: $darkgrey;
   font: $headline5;
   letter-spacing: 1px;
}

input {
   margin: 0 auto;
   width: 360px;
   display: block;
   border-radius: 3px;
   border: 2px solid $lightgrey;
   border-bottom: 3px solid $purple;
   background-color: white;
   color: $darkgrey;
   font: $body2;
   height: 40px;
   padding: 0.5vh;
   margin-bottom: 10px;
}

input:focus,
textarea:focus {
   background-color: white;
   border: 2px solid $neonpurple;
}

.btn-container {
   position: absolute;
   bottom: 10px;
   right: 10px;
}

button {
   font: $buttontext;
   letter-spacing: 1.25px;
   border-radius: 4px;
   border: 2px solid $darkgrey;
   background-color: white;
   padding: 5px 10px;
   margin: 2px;
   width: 90px;
   height: 36px;

   &:hover {
      border-color: $purple;
      background-color: $purple;
      color: white;
      cursor: pointer;
   }
}

.colored-btn {
   border-color: $purple;
   background-color: $purple;
   color: white;

   &:hover {
      border: 2px solid $darkgrey;
      background-color: white;
      color: $darkgrey;
   }
}

.link-to-page {
   position: absolute;
   bottom: 20px;
   right: 5px;
   padding: 4px;
   text-decoration: underline;
   font: 1.4em 'Roboto';
   color: $darkgrey;

   &:hover {
      color: $purple;
   }
}

@media only screen and (min-width: 600px) {
   .login-container {
      width: 400px;
   }
}
</style>
