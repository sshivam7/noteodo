<template>
   <div class="side-nav">
      <div class="search-bar">
         <input
            type="text"
            class="search-field"
            v-model="search"
            placeholder="Search"
         />
         <button class="search-button" />
      </div>
      <router-link class="side-link h1-link link-to-home" to="/overview"
         >Overview</router-link
      >
      <div class="page-nav">
         <h4>Pages</h4>
         <div
            class="page-list"
            v-bind:key="index"
            v-for="(page, index) in pageData"
         >
            <router-link
               class="side-link h2-link"
               :to="{ name: 'Page', params: { id: page.page_id } }"
            >
               {{ page.title }}
            </router-link>
         </div>
         <router-link class="side-link h2-link create-page" to="/createPage"> +  Create Page </router-link>
      </div>
      <div class="user-bar">
         <img
            alt="User animal Picture"
            @click="$router.push('/settings')"
            width="50"
            :src="
               require(`../assets/animals/${
                  this.$store.state.userInfo.animal || 'cat'
               }.png`)
            "
         />
         <p>{{ this.$store.state.userInfo.username }}</p>
      </div>
   </div>
</template>

<script>
import Axios from 'axios';

export default {
   name: 'SideNav',
   data() {
      return {
         search: '',
         pageData: ''
      };
   },
   beforeMount: async function () {
      let token = localStorage.getItem('auth-token');
      const pages = await Axios.get('http://localhost:3000/pages', {
         headers: { Authorization: token }
      });
      this.pageData = pages.data.rows;
   }
};
</script>

<style lang="scss">
.side-nav {
   position: relative;
   height: 100vh;
   width: 300px;
   background-color: $navbarcolor;
   display: flex;
   flex-direction: column;
}

.search-bar {
   margin-top: 20px;
   display: flex;
   flex-direction: row;

   .search-field {
      padding-left: 8px;
      margin-right: 0;
      margin-left: 15px;
      width: 230px;
      background-color: lighten($navbarcolor, 5%);
      color: white;
      border: none;
      border-radius: 10px;
      outline: none;

      &:focus {
         background-color: lighten($navbarcolor, 5%);
      }
   }

   .search-button {
      margin: 0;
      background-color: lighten($navbarcolor, 5%);
      width: 50px;
      height: 40px;
      border-radius: 10px;
      border: none;
      margin-left: -20px;
      background: lighten($navbarcolor, 5%) url('../assets/icons/search.png')
         no-repeat center;
      background-size: 25px;

      &:hover {
         background-image: url('../assets/icons/search-white.png');
      }
   }
}

.page-nav {
   text-align: left;

   h4 {
      color: lightgray;
      font: $body1;
      text-align: left;
      margin-left: 20px;
      margin-top: 15px;
      margin-bottom: 10px;
   }

   .page-list {
      text-align: left;
   }
}

.side-link {
   margin-left: 10px;
   margin-right: 10px;
   border-radius: 10px;
   padding: 2px 10px;

   &:hover {
      background-color: lighten($navbarcolor, 5%);
      color: $purple;
   }
}

.h1-link {
   letter-spacing: 1.25px;
   margin-top: 20px;
   text-align: left;
   color: white;
   font: $h1link;
}

.h2-link {
   margin-top: 4px;
   text-align: left;
   color: white;
   font: $h2link;
   letter-spacing: 0.25px;
}

.create-page {
   color: $grey;
}

.user-bar {
   display: flex;
   flex-direction: row;
   position: absolute;
   bottom: 25px;
   margin: 10px 15px;
   img {
      border-radius: 50%;
      padding: 3px;
      background-color: white;

      &:hover {
         border: 1px solid;
         box-shadow: 0px 0px 20px $neonpurple;
         cursor: pointer;
      }
   }

   p {
      margin: auto 20px;
      letter-spacing: 1px;
      padding: 0px;
      color: white;
      font: $headline4;
   }
}
</style>
