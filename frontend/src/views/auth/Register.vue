<template>
   <div class="register">
      <h2 class="header-text">
         Noteodo:<span class="colored-text">Register</span>
      </h2>
      <div class="register-container">
         <h1>Get Started</h1>

         <label for="usr">Username</label>
         <input
            type="text"
            v-model="form.username"
            placeholder="Enter Username"
            name="usr"
            required
         />

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

         <label for="confirm-password">Confirm Password</label>
         <input
            type="password"
            v-model="form.passwordCheck"
            placeholder="Re-enter Password"
            name="confirm-password"
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
               Register
            </button>
         </div>
      </div>
      <div class="register-side">
         <h3>
            Choose a profile Icon - <span>{{ form.animal }}</span>
         </h3>
         <div class="image-selector">
            <label>
               <input
                  type="radio"
                  v-model="form.animal"
                  name="animal-select"
                  value="cat"
               />
               <img src="../../assets/animals/cat.png" />
            </label>

            <label>
               <input
                  type="radio"
                  v-model="form.animal"
                  name="animal-select"
                  value="cow"
               />
               <img src="../../assets/animals/cow.png" />
            </label>

            <label>
               <input
                  type="radio"
                  v-model="form.animal"
                  name="animal-select"
                  value="frog"
               />
               <img src="../../assets/animals/frog.png" />
            </label>

            <label>
               <input
                  type="radio"
                  v-model="form.animal"
                  name="animal-select"
                  value="jaguar"
               />
               <img src="../../assets/animals/jaguar.png" />
            </label>

            <label>
               <input
                  type="radio"
                  v-model="form.animal"
                  name="animal-select"
                  value="orca"
               />
               <img src="../../assets/animals/orca.png" />
            </label>

            <label>
               <input
                  type="radio"
                  v-model="form.animal"
                  name="animal-select"
                  value="unicorn"
               />
               <img src="../../assets/animals/unicorn.png" />
            </label>
         </div>
         <h4 v-show="form.username">&lt; {{ form.username }} &gt;</h4>
      </div>
      <router-link class="link-to-page" to="/login"
         >Already have an account? Login now
      </router-link>
      <page-footer />
   </div>
</template>

<script>
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

import PageFooter from '../../components/PageFooter.vue';

export default {
   name: 'Register',
   components: { PageFooter },
   data() {
      return {
         form: {
            username: '',
            email: '',
            password: '',
            passwordCheck: '',
            animal: 'cat'
         },
         errMessages: []
      };
   },
   methods: {
      submitForm: async function () {
         try {
            // Register new user
            await Axios.post('http://localhost:3000/user/register', this.form);

            // Login new user
            const loginResponse = await Axios.post(
               'http://localhost:3000/user/login',
               {
                  email: this.form.email,
                  password: this.form.password
               }
            );

            // Get and store user info from JWT payload
            const payload = jwtDecode(loginResponse.data.token);
            console.log(payload);
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
.register {
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
.register-container {
   position: relative;
   border-radius: 20px;
   margin-top: 90px;
   width: 350px;
   height: 605px;
   background: $lightgrey2;
   display: flex;
   flex-direction: column;
}

.error-container {
   ul {
      padding: 0px;

      li {
         letter-spacing: 0.5px;
         color: $rederror;
         font: $headline6;
      }
   }
}

.register-side {
   display: flex;
   flex-direction: column;
   align-content: center;
   justify-content: center;
   margin: 30px auto;

   h3 {
      padding: 0;
      text-align: center;
      color: $darkgrey;
      font: $headline3;
      margin: 10px;
      max-width: initial;

      span {
         font-size: 1em;
         color: $purple;
      }
   }

   h4 {
      font: $headline4;
      color: $darkgrey;
      letter-spacing: 1.5px;
   }

   .image-selector {
      display: flex;
      flex-wrap: wrap;

      label {
         max-width: 150px;
      }

      /* HIDE RADIO */
      [type='radio'] {
         position: absolute;
         opacity: 0;
         width: 0;
         height: 0;
      }

      /* IMAGE STYLES */
      [type='radio'] + img {
         cursor: pointer;
      }

      /* CHECKED STYLES */
      [type='radio']:checked + img {
         outline: 5px solid $purple;
      }

      img {
         height: 80px;
         width: 80px;
         border-radius: 50%;
         padding: 5px;
      }
   }
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
   width: 320px;
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
   .register {
      flex-direction: row;
      position: initial;
      align-items: left;
      justify-content: left;
   }
   .register-container {
      margin-left: 30px;
      width: 400px;
   }

   input {
      width: 360px;
   }

   .register-side {
      margin: 0 auto;
   }
}
</style>
