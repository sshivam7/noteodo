<template>
   <router-link v-if="link.charAt(0) === '/'" :to="link">
      <div class="button">
         {{ text }}
      </div>
   </router-link>
   <a v-else :href="link">
      <div class="button">
         {{ text }}
      </div>
   </a>
</template>

<script>
export default {
   name: 'LaunchButton',
   props: {
      text: String,
      link: String
   }
};
</script>

<style lang="scss">
a {
   text-decoration: none;
}

.button {
   background: $darkgrey;
   border-radius: 20px;
   padding: 15px 20px;
   width: 250px;
   font: 20px 'Staatliches';
   color: white;

   &:hover {
      color: $neonpurple;
   }
}
</style>
