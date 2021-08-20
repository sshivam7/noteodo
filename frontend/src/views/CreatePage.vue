<template>
   <div class="page">
      <side-nav />
      <h2 class="alt-header-text">
         Noteodo:<span class="colored-text"> create Page</span>
      </h2>
      <div class="page-container">
         <input type="text" class="title-text" v-model="title" placeholder="title" />
         <ckeditor
            class="pageck"
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
         ></ckeditor>
         <button class="save-btn" v-on:click="createPage()">Create</button>
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
   name: 'CreatePage',
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
         title: ''
      };
   },
   methods: {
      createPage: async function () {
         let token = localStorage.getItem('auth-token');
         Axios.post(
            'http://localhost:3000/pages/createPage',
            {
               notes: this.editorData,
               title: this.title,
               pinned: false
            },
            {
               headers: { Authorization: token }
            }
         );
      }
   },
}
</script>

<style lang="scss">

</style>
