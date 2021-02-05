<template>
  <div>
    <div class="c-copper-chronicles__top  row">
      <div class="c-copper-chronicles__top__new col-xl-6">
        <h3>New</h3>
        <div v-for="entry in newEntry" :key="entry.id">
          <large-blog-card v-if="entry.image && entry.title.length < 55" :entry="entry"  />
          <large-blog-card-text  v-else :entry="entry" />
        </div>
        
      </div>
      <div class="c-copper-chronicles__top__featured col-xl-5 offset-xl-1">
        <h3>Featured</h3>
        <featured-blog-card v-for="featuredTeaser in featuredEntries" :key="featuredTeaser.id" :entry="featuredTeaser" />
      </div>
    </div>

    <div class="row c-copper-chronicles__title">
      <h3 class="col-md-12" id="topOfPagination">Recent Stories</h3>
    </div>
    <div class="row">
      <div v-if="entries.length === 0 && !noData" class="c-copper-chronicles__loading c-copper-chronicles__loading--1470">
        <loading/>
      </div>
      <div class="col-md-12" v-if="noData">
        <no-results/>
      </div>
      <div :class="['col-lg-6', 'col-xl-4', 'c-card-col', {'order-md-last': index > 3 || (index >= 1 && entries.length < 4) }]" v-for="(entryTeaser, index) in entries" :key="entryTeaser.id">
        <blog-card v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser" />
        <blog-card-text v-else :entry="entryTeaser" />
      </div>
      <div class="col-lg-6 col-xl-4 c-card-col" v-if="entries.length >= 1">
        <ad :link="adLink" :image="adImage" />
      </div>
    </div>

    <div class="c-copper-chronicles__pagination row">
      <pagination class="d-none d-md-flex" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="140" @changePage="changePage" />
      
      <pagination-mobile class="d-flex d-md-none" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="70" @changePage="changePage" />
    </div>
  </div>
  
</template>

<script>
import Ad from '../components/Ad.vue'
import BlogCard from '../components/BlogCard.vue'
import BlogCardText from '../components/BlogCardText.vue'
import FeaturedBlogCard from '../components/FeaturedBlogCard.vue'
import LargeBlogCard from '../components/LargeBlogCard.vue'
import LargeBlogCardText from '../components/LargeBlogCardText.vue'
import Loading from '../components/Loading.vue'
import NoResults from '../components/NoResults.vue'
import Pagination from '../components/Pagination.vue'
import PaginationMobile from '../components/PaginationMobile.vue'
import { updateUrl } from '../mixins/updateUrl'

import axios from 'axios';

export default {
  name: "IndexPage",
  data() {
    return {
      newEntry: [],
      featuredEntries: [],
      entries: [],
      errors: [],
      noData: false,
      adLink: "",
      adImage: "",
      paginationMeta : {
        currentPage: 0,
        totalPages: 0
      }
    };
  },
  methods: {
    getEntries: function(changePage){
      let entriesUrl = "/api/blog/8.json";
      if(changePage){
        entriesUrl = entriesUrl + '?pg=' + changePage;
      }
      axios.get(entriesUrl).then(response => {
        if(!changePage){
          this.newEntry = response.data.data.length !== 0 ? [response.data.data[0]] : [];
        }
        this.noData = response.data.data.length === 0;
        this.entries = response.data.data || [];
        this.paginationMeta.currentPage = response.data.meta.pagination.current_page;
        this.paginationMeta.totalPages = response.data.meta.pagination.total_pages;
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    getFeaturedEntries: function(){
      let url = '/api/featured-blog.json';
      axios.get(url).then(response => {
        this.featuredEntries = response.data.data || [];
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    getNewEntry: function(){
      let entriesUrl = "/api/blog/1.json";
      axios.get(entriesUrl).then(response => {
        this.newEntry = response.data.data || [];
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    changePage: function(newPage){
      this.entries = [];
      this.getEntries(newPage);
      this.updateUrl('', '', newPage)
    }
  },
  // Fetches entries when the component is created.
  created() {
    // Check for page number query
    this.adLink = document.getElementById('vue-blog-ad-link').innerHTML || '';
    this.adImage = document.getElementById('vue-blog-ad-image').innerHTML || '';
    
    let pageNumber = document.getElementById('vue-blog-page-num').innerHTML || '';
    if(pageNumber){
      this.getNewEntry();
      this.getEntries(pageNumber);
    } else {
      this.getEntries();
    }
    this.getFeaturedEntries();
  },
  components: {
    Ad,
    BlogCard,
    BlogCardText,
    FeaturedBlogCard,
    LargeBlogCard,
    LargeBlogCardText,
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