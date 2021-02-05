<template>
  <div>
    <div class="row" id="topOfPagination">
      <div v-if="authors.length === 0 && !noData" class="col-md-12 c-copper-chronicles__loading c-copper-chronicles__loading--488">
        <loading/>
      </div>
      <div class="col-md-12" v-if="noData">
        <no-results/>
      </div>
      <div class="col-xl-6 col-lg-12 c-copper-chronicles__topics t-horizontal-line-above" v-for="author in authors" :key="author.id">
        <author-list :author="author" />
      </div>
    </div>
    <div class="c-copper-chronicles__pagination row">
      <pagination class="d-none d-md-flex" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />
      
      <pagination-mobile class="d-flex d-md-none" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />
    </div>
  </div>
  
</template>

<script>


import AuthorList from '../components/AuthorList.vue'
import Loading from '../components/Loading.vue'
import NoResults from '../components/NoResults.vue'
import Pagination from '../components/Pagination.vue'
import PaginationMobile from '../components/PaginationMobile.vue'
import { updateUrl } from '../mixins/updateUrl'

import axios from 'axios';

export default {
  name: "AuthorPage",
  data() {
    return {
      entries: [],      
      authors: [],
      errors: [],
      noData: false,
      paginationMeta : {
        currentPage: 0,
        totalPages: 0
      }       
    };
  },
  methods: {
    getAuthors: function(changePage){
      var url = '/api/authors.json';
      if(changePage) {
        url = url + '?pg=' + changePage;
      }      
      axios.get(url)
      .then(response => {
        this.authors = response.data.data || [];
        this.noData = response.data.data.length === 0;
        this.paginationMeta.currentPage = response.data.meta.pagination.current_page;
        this.paginationMeta.totalPages = response.data.meta.pagination.total_pages;   
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    changePage: function(newPage){
      this.authors = [];
      this.getAuthors(newPage);
      this.updateUrl('', '', newPage)
    }        
  },
  // Fetches entries when the component is created.
  created() {
    let pageNumber = document.getElementById('vue-blog-page-num').innerHTML || '';
    if(pageNumber){
      this.getAuthors(pageNumber);
    } else{
      this.getAuthors();
    }
  },
  components: {
    AuthorList,
    Loading,
    NoResults,
    Pagination,
    PaginationMobile
  },
  mixins: [
    updateUrl
  ]
};
</script>

<style>

</style>