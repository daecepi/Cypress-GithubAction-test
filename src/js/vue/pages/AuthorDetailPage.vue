<template>
  <div>
    <div class="row">
      <div class="col-md-12 c-copper-chronicles__title"  id="topOfPagination">
        <h3>Latest Posts</h3>  
      </div>
    </div>
    <div class="row">
      <div v-if="entries.length === 0 && !noData" class="col-md-12 c-copper-chronicles__loading c-copper-chronicles__loading--488">
        <loading/>
      </div>
      <div class="col-md-12" v-if="noData">
        <no-results/>
      </div>
      <div class="col-lg-6 col-xl-4 c-card-col" v-for="entryTeaser in entries" :key="entryTeaser.id">
        <blog-card v-if="entryTeaser.image" :entry="entryTeaser" />
        <blog-card-text v-else :entry="entryTeaser" />
      </div>
    </div>
    <div class="c-copper-chronicles__pagination row" >
      <pagination class="d-none d-md-flex"  v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />

      <pagination-mobile class="d-flex d-md-none" v-if="paginationMeta.totalPages > 1" :currentPage="paginationMeta.currentPage" :totalPages="paginationMeta.totalPages" scrollOffset="100" @changePage="changePage" />
    </div>
  </div>
  
</template>

<script>
import BlogCard from '../components/BlogCard.vue'
import BlogCardText from '../components/BlogCardText.vue'
import Loading from '../components/Loading.vue'
import NoResults from '../components/NoResults.vue'
import Pagination from '../components/Pagination.vue'
import PaginationMobile from '../components/PaginationMobile.vue'
import { updateUrl } from '../mixins/updateUrl'


import axios from 'axios';

export default {
  name: "AuthorDetailPage",
  data() {
    return {
      entries: [],
      errors: [],
      noData: false,
      authorId: "",
      paginationMeta : {
        currentPage: 0,
        totalPages: 0
      }      
    };
  },
  methods: {  
    getEntries: function(changePage){
      // query = '?searchCategories=199'; //for testing
      var url = '/api/blog-author.json?author=' + this.authorId;
      if(changePage){
        url = url + '&pg=' + changePage;
      }
      axios.get(url)
      .then(response => {
        if(!changePage){
          this.newEntry = [response.data.data[0]] || [];
        }
        this.entries = response.data.data || [];
        this.noData = response.data.data.length === 0;
        this.paginationMeta.currentPage = response.data.meta.pagination.current_page;
        this.paginationMeta.totalPages = response.data.meta.pagination.total_pages;      
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
    // Only get featured posts
    this.authorId = document.getElementById('vue-blog-author-id').innerHTML;
    let pageNumber = document.getElementById('vue-blog-page-num').innerHTML || '';
    if(pageNumber){
      this.getEntries(pageNumber);
    } else{
      this.getEntries();
    }
  },
  components: {
    BlogCard,
    BlogCardText,
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