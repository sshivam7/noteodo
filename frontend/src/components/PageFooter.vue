<template>
   <footer>
      <ul>
         <li>
            View the
            <a href="https://github.com/sshivam7/noteodo">Github Repository</a>
         </li>
         <li>Icons from <a href="https://icons8.com">Icons8</a></li>
      </ul>
   </footer>
</template>

<script>
export default {
   name: 'Footer'
};
</script>

<style lang="scss">
footer {
   width: 100%;
   height: 20px;
   position: absolute;
   bottom: 0;
   background-color: $purple;
   display: flex;
   align-items: center;
   justify-content: left;

   ul {
      list-style: none;
      display: flex;
      margin: 0px;
      padding: 0px;

      li {
         padding: 0px 10px;
         color: white;
         font: $body2;

         a {
            font-size: 1em;
            color: $darkgrey;

            &:hover {
               color: white;
            }
         }
      }
   }
}
</style>
