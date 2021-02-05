<template>
  <div>
    <div class="row" v-if="!noData">
      <div class="col-lg-5 col-md-8 c-copper-chronicles__categories">
        <blog-categories @sendQuery="setQuery" :topLevelCategories="true" />
      </div>
    </div>
    <div class="row" id="topOfPagination">
      <div v-if="entries.length === 0 && !noData" class="c-copper-chronicles__loading c-copper-chronicles__loading--1470">
        <loading/>
      </div>
      <div class="col-md-12" v-if="noData">
        <no-results/>
      </div>
      <div :class="['col-lg-6', 'col-xl-4', 'c-card-col', {'order-md-last': index > 3 }]" v-for="(entryTeaser, index) in entries" :key="entryTeaser.id">
        <blog-card v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser" />
        <blog-card-text v-else :entry="entryTeaser" />
      </div>
    </div>
    <div class="c-copper-chronicles__pagination row" >
      <pagination class="d-none d-md-flex"  v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />

      <pagination-mobile class="d-flex d-md-none"  v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />
    </div>
  </div>
  
</template>

<script>
import BlogCard from '../components/BlogCard.vue'
import BlogCardText from '../components/BlogCardText.vue'
import BlogCategories from '../components/BlogCategories.vue'
import LargeBlogCard from '../components/LargeBlogCard.vue'
import Loading from '../components/Loading.vue'
import NoResults from '../components/NoResults.vue'
import Pagination from '../components/Pagination.vue'
import PaginationMobile from '../components/PaginationMobile.vue'
import { updateUrl } from '../mixins/updateUrl'

import axios from 'axios';

export default {
  name: "FeaturedPage",
  data() {
    return {
      entries: [],
      errors: [],
      searchQuery: "",
      categoryQuery: "",
      noData: false,
      paginationMeta : {
        currentPage: 0,
        totalPages: 0
      }
    };
  },
  methods: {
    getEntries: function(changePage){
      let url = '/api/blog/9.json?search=' + this.searchQuery;

      // check if category is selected
      if(this.categoryQuery){
        url = url + '&searchCategories=' + this.categoryQuery;
      }  
      if(changePage){
        url = url + '&pg=' + changePage;
      } 
      
      axios.get(url)
      .then(response => {
        this.noData = response.data.data.length === 0;
        this.entries = response.data.data || []; 
        this.paginationMeta.currentPage = response.data.meta.pagination.current_page;
        this.paginationMeta.totalPages = response.data.meta.pagination.total_pages;
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    setQuery: function(query){
      this.entries = [];
      this.noData = false;
      this.categoryQuery = query;
      this.getEntries();
      this.updateUrl(this.searchQuery, this.categoryQuery, '');
    },
    changePage: function(newPage){
      this.entries = [];
      this.getEntries(newPage);
      this.updateUrl(this.searchQuery, this.categoryQuery, newPage)
    }
  },
  // Fetches entries when the component is created.
  created() {
    // Only get featured posts
    this.searchQuery = document.getElementById('vue-blog-query').innerHTML.replace(/ /g, '+') || '';
    this.categoryQuery = document.getElementById('vue-blog-subcategory-query').innerHTML || '';
    let pageNumber = document.getElementById('vue-blog-page-num').innerHTML || '';
    if(pageNumber){
      this.getEntries(pageNumber);
    } else {
      this.getEntries();
    }
  },
  components: {
    BlogCard,
    BlogCardText,
    BlogCategories,
    LargeBlogCard,
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