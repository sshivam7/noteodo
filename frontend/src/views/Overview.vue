<template>
   <div class="overview">
      <side-nav />
      <h2 class="alt-header-text">
         Noteodo:<span class="colored-text">{{ title }}</span>
      </h2>
      <div class="overview-container">
         <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
         ></ckeditor>
         <button class="save-btn" v-on:click="saveNote()">Save</button>
      </div>
      <div class="main-panel"></div>
   </div>
   <page-footer />
</template>

<script>
import Axios from 'axios';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

import SideNav from '../components/SideNav.vue';
import PageFooter from '../components/PageFooter.vue';

export default {
   name: 'Overview',
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
         title: '',
         notes: '',
         overviewList: ''
      };
   },
   methods: {
      saveNote: async function () {
         let token = localStorage.getItem('auth-token');
         Axios.put(
            'http://localhost:3000/overview/update',
            {
               notes: this.editorData
            },
            {
               headers: { Authorization: token }
            }
         );
      }
   },
   beforeMount: async function () {
      let token = localStorage.getItem('auth-token');
      const overviewPageData = await Axios.get(
         'http://localhost:3000/overview/get',
         {
            headers: { Authorization: token }
         }
      );
      this.title = overviewPageData.data.rows[0].title;
      this.editorData = overviewPageData.data.rows[0].notes;

      const todoList = await Axios.get(
         `http://localhost:3000/todolist/${overviewPageData.data.rows[0].todolist_id}`,
         {
            headers: { Authorization: token }
         }
      );
      //TODO ck editor
      this.overviewList = todoList;
   }
};
</script>

<style lang="scss">
.overview {
   height: 100%;
   display: flex;
   flex-direction: row;
}

.overview-container {
   margin: 30px 20px;

   .save-btn {
      position: relative;
      bottom: 7vh;
      left: 19vw;
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

.ck-editor__editable {
   width: 46vw;
   height: 88vh;
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
