<template>
   <router-link :to="link">
      <div class="standard-btn">
         {{ text }}
      </div>
   </router-link>
</template>

<script>
export default {
   name: 'StandardButton',
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

.standard-btn {
   background: white;
   border: 2px solid $grey;
   border-radius: 20px;
   padding: 5px 10px;
   font: 2em 'Staatliches';
   color: $grey;
   width: 50vw;
   max-width: 300px;

   &:hover {
      color: $neonpurple;
      border-color: $neonpurple;
   }
}
</style>
