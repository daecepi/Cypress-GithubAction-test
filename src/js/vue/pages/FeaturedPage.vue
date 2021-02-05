<template>
  <div>
    <div class="row">
      <div class="col-lg-5 col-md-8 c-copper-chronicles__categories">
        <blog-categories @sendQuery="setQuery" @sendAd="setAd" :topLevelCategories="true" />
      </div>
    </div>
    <div class="row" id="topOfPagination">
      <div v-if="entries.length === 0 && !noData" class="c-copper-chronicles__loading c-copper-chronicles__loading--1610">
        <loading/>
      </div>
      <div class="col-md-12" v-if="noData">
        <no-results/>
      </div>

      <!-- First entry large in desktop and mobile view -->
      <div class="col-lg-6 c-card-col" v-for="entryTeaser in firstEntry" :key="entryTeaser.id">
        <large-blog-card v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser"  />
        <large-blog-card-text  v-else :entry="entryTeaser" />
      </div>

      <!-- Second entry large in desktop but small in mobile view -->
      <div class="col-lg-6 c-card-col" v-for="entryTeaser in secondEntry" :key="entryTeaser.id">
        <large-blog-card class="d-none d-md-flex" v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser"  />
        <large-blog-card-text class="d-none d-md-flex"  v-else :entry="entryTeaser" />
        <blog-card class="d-flex d-md-none" v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser" />
        <blog-card-text class="d-flex d-md-none" v-else :entry="entryTeaser" />
      </div>

      <!-- Rest of entries behave normally -->
      <div :class="[{'order-md-last': index > 3 || (index > 1 && entries.length < 3) }, 'col-lg-6 col-xl-4 c-card-col']" v-for="(entryTeaser, index) in otherEntries" :key="entryTeaser.id">
        <blog-card v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser" />
        <blog-card-text v-else :entry="entryTeaser" />
      </div>

      <div class="col-lg-6 col-xl-4 c-card-col" v-if="otherEntries.length > 3">
        <ad :link="adLink" :image="adImage"/>
      </div>
    </div>
    <div class="c-copper-chronicles__pagination row">
      <pagination class="d-none d-md-flex" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />

      <pagination-mobile class="d-flex d-md-none" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />
    </div>
  </div>
  
</template>

<script>
import Ad from '../components/Ad.vue'
import BlogCard from '../components/BlogCard.vue'
import BlogCardText from '../components/BlogCardText.vue'
import BlogCategories from '../components/BlogCategories.vue'
import LargeBlogCard from '../components/LargeBlogCard.vue'
import LargeBlogCardText from '../components/LargeBlogCardText.vue'
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
      firstEntry: [],
      secondEntry: [],
      otherEntries: [],
      errors: [],
      noData: false,
      adLink: "",
      adImage: "",
      categoryQuery: "",
      paginationMeta : {
        currentPage: 0,
        totalPages: 0
      }
    };
  },
  methods: {
    getEntries: function(changePage){
      let url = '/api/featured-blog.json?';

      // check if category is selected
      if(this.categoryQuery){
        url = url + 'searchCategories=' + this.categoryQuery + '&';
      }  
      if(changePage){
        url = url + 'pg=' + changePage;
      } 

      axios.get(url)
      .then(response => {
        this.noData = response.data.data.length === 0;
        this.entries = response.data.data || [];
        this.firstEntry = [this.entries[0]] || [];
        this.secondEntry = [this.entries[1]] || [];
        this.otherEntries = this.entries.slice(2, this.entries.length) || [];
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
      this.updateUrl('', this.categoryQuery, '');
    },
    setAd: function(categoryData){
      this.adLink = categoryData.adLink || document.getElementById('vue-blog-ad-link').innerHTML;
      this.adImage = categoryData.adImage || document.getElementById('vue-blog-ad-image').innerHTML;
    },
    changePage: function(newPage){
      this.entries = [];
      this.getEntries(newPage);
      this.updateUrl('', this.categoryQuery, newPage);
    }
  },
  // Fetches entries when the component is created.
  created() {
    // Only get featured posts
    this.categoryQuery = document.getElementById('vue-blog-subcategory-query').innerHTML || '';
    if(this.categoryQuery){
      this.adLink = document.getElementById('vue-blog-ad-link--sub').innerHTML || '';
      this.adImage = document.getElementById('vue-blog-ad-image--sub').innerHTML || '';
    } else {
      this.adLink = document.getElementById('vue-blog-ad-link').innerHTML || '';
      this.adImage = document.getElementById('vue-blog-ad-image').innerHTML || '';
    }
    let pageNumber = document.getElementById('vue-blog-page-num').innerHTML || '';

    if(pageNumber){
      this.getEntries(pageNumber);
    } else {
      this.getEntries();
    }
  },
  components: {
    Ad,
    BlogCard,
    BlogCardText,
    BlogCategories,
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