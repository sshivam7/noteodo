<template>
   <div class="get-started">
      <nav class="header">
         <ul>
            <li>
               <img alt="Noteodo logo" src="../assets/logo.png" height="80" />
            </li>
            <li><h2>Noteodo</h2></li>
         </ul>
      </nav>
      <h3>Planning Just Got Easier</h3>
      <p>
         Plan, map, and organize your schedule with Notedodo. A notetaking and
         task managing app built off of the bullet journal concept
      </p>
      <ul class="button-container">
         <li>
            <launch-button text="Use in Browser" link="/home"></launch-button>
         </li>
         <li>
            <launch-button
               text="Download App"
               link="https://stackoverflow.com/"
            ></launch-button>
         </li>
      </ul>
   </div>
</template>

<script>
// @ is an alias to /src
import LaunchButton from '../components/buttons/LaunchButton.vue';

export default {
   name: 'GetStarted',
   components: {
      LaunchButton
   }
};
</script>

<style lang="scss">
.get-started {
   background: url('../assets/backgrounds/narrowbackground.png') 100%;
   height: 100%;
}

ul {
   list-style: none;
}

.header {
   padding-top: 2vh;

   ul {
      padding-left: 3vw;
      margin: 0px;
      display: flex;

      li {
         h2 {
            font: 60px 'Passion One', cursive;
            padding-left: 20px;
            color: white;
            margin-top: 15px;
            margin-bottom: 15px;
         }
      }
   }
}

h3 {
   text-align: left;
   font: 22vw 'Passion One', cursive;
   color: white;
   margin: 0px;
   padding-left: 3vw;
}

p {
   text-align: left;
   color: $darkgrey;
   font: $bodyheading;
   max-width: 90vw;
   margin: auto;
   margin-bottom: 12vh;
}

.button-container {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   padding: 0;

   li {
      padding-right: 20px;
      margin-bottom: 20px;
   }
}

@media only screen and (min-width: 600px) {
   .get-started {
      background: url('../assets/backgrounds/background.png') 100%;
   }

   .header ul li h2 {
      margin-top: 10px;
   }

   h3 {
      font: 90px Anton, sans-serif;
      letter-spacing: 0.5px;
      max-width: 650px;
   }

   p {
      font: $bodyheading;
      max-width: 550px;
      margin: 0px;
      padding-left: 3vw;
   }

   .button-container {
      position: fixed;
      bottom: 0;
      left: 3vw;
      flex-direction: row;
   }
}
</style>
