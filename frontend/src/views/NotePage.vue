<template>
   <div class="page">
      <side-nav />
      <h2 class="alt-header-text">
         Noteodo:<span class="colored-text">Pages</span>
      </h2>
      <div class="page-container">
         <input type="text" class="title-text" v-model="page.title" />
         <ckeditor
            class="pageck"
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
         ></ckeditor>
         <button class="save-btn" v-on:click="savePage()">Save</button>
      </div>
      <page-footer />
   </div>
</template>

<script>
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import Axios from 'axios';

import SideNav from '../components/SideNav.vue';
import PageFooter from '../components/PageFooter.vue';

export default {
   name: 'Page',
   components: { SideNav, PageFooter },
   data() {
      return {
         editor: InlineEditor,
         editorData: '',
         editorConfig: {
            toolbar: [
               'heading',
               'bold',
               'italic',
               'link',
               '|',
               'numberedList',
               'blockQuote',
               'insertTable',
               '|',
               'undo',
               'redo'
            ],
            heading: {
               options: [
                  {
                     model: 'paragraph',
                     title: 'Paragraph',
                     class: 'ck-heading_paragraph'
                  },
                  {
                     model: 'heading1',
                     view: 'h1',
                     title: 'Heading 1',
                     class: 'ck-heading_heading1'
                  },
                  {
                     model: 'heading2',
                     view: 'h2',
                     title: 'Heading 2',
                     class: 'ck-heading_heading2'
                  },
                  {
                     model: 'heading3',
                     view: 'h3',
                     title: 'Heading 3',
                     class: 'ck-heading_heading3'
                  }
               ]
            }
         },
         page: ''
      };
   },
   methods: {
      savePage: async function () {
         let token = localStorage.getItem('auth-token');
         Axios.put(
            'http://localhost:3000/pages/update',
            {
               notes: this.editorData,
               title: this.page.title,
               idval: this.$route.params.id
            },
            {
               headers: { Authorization: token }
            }
         );
      }
   },
   beforeMount: async function () {
      let token = localStorage.getItem('auth-token');
      const curPage = await Axios.get(
         `http://localhost:3000/pages/${this.$route.params.id}`,
         {
            headers: { Authorization: token }
         }
      );
      this.page = curPage.data.rows[0];
      this.editorData = curPage.data.rows[0].notes;
   },
   watch: {
      async $route(to, from) {
         if (this.$route.params.id) {
            console.log(`to: ${to} from: ${from}`);
            let token = localStorage.getItem('auth-token');
            const curPage = await Axios.get(
               `http://localhost:3000/pages/${this.$route.params.id}`,
               {
                  headers: { Authorization: token }
               }
            );
            this.page = curPage.data.rows[0];
            this.editorData = curPage.data.rows[0].notes;
         }
      }
   }
};
</script>

<style lang="scss">
.page {
   height: 100%;
   display: flex;
   flex-direction: row;
}

.page-container {
   margin: 30px 20px;

   .title-text {
      border: 2px solid $lightgrey;
      width: 78vw;
      height: 50px;
      border-radius: 10px;
      font: $headline4;
      padding-left: 10px;

      &:hover {
         border: 2px solid $purple;
      }
   }

   .save-btn {
      position: relative;
      bottom: 7vh;
      left: 35vw;
   }

   p {
      margin: 0px;
      padding: 0px 5px;
      font: $body2;

      strong,
      i {
         font-size: 100%;
      }
   }

   h1 {
      font: $headline2;
      padding: 0px 5px;

      strong,
      i {
         font-size: 100%;
      }
   }

   h2 {
      font: $headline3;
      color: $grey;
      padding: 0px 5px;

      strong,
      i {
         font-size: 100%;
      }
   }

   h3 {
      font: $headline4;
      color: $darkgrey;
      padding: 0px 5px;
      margin: 0px;

      strong,
      i {
         font-size: 100%;
      }
   }
}

.pageck.ck-editor__editable {
   width: 78vw;
   height: 70vh;
   padding: 5px;
}

.ck.ck-editor__editable_inline {
   border: 2px solid $lightgrey;
}

.ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable),
.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners {
   border-radius: 20px;
}
</style>
