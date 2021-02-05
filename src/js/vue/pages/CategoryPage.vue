<template>
  <div>
    <div class="row">
      <div class="col-lg-5 col-md-8 c-copper-chronicles__categories">
        <blog-categories @sendQuery="setQuery" @sendAd="setAd" :categryId="categryId" />
      </div>
    </div>
    <div class="c-copper-chronicles__top  row" v-if="!noData">
      <div class="c-copper-chronicles__top__new col-xl-6" v-if="newEntry.length">
        <h3>New</h3>
        <div v-for="entry in newEntry" :key="entry.id">
          <large-blog-card v-if="entry.image && entry.title.length < 55" :entry="entry"  />
          <large-blog-card-text  v-else :entry="entry" />
        </div>
      </div>
      <div class="c-copper-chronicles__top__featured col-xl-5 offset-xl-1" v-if="featuredEntries.length">
        <h3>Featured</h3>
        <featured-blog-card v-for="featuredTeaser in featuredEntries" :key="featuredTeaser.id" :entry="featuredTeaser" />
      </div>
    </div>
    <div class="row" id="topOfPagination"> 
      <div v-if="entries.length === 0 && !noData" class="c-copper-chronicles__loading c-copper-chronicles__loading--980">
        <loading/>
      </div>
      <div class="col-md-12" v-if="noData">
        <no-results/>
      </div>
      <div :class="['col-lg-6', 'col-xl-4', 'c-card-col', {'order-md-last': index > 3 || (index >= 1 && entries.length < 4) }]" v-for="(entryTeaser, index) in entries" :key="entryTeaser.id">
        <blog-card v-if="entryTeaser.image && entryTeaser.title.length < 55" :entry="entryTeaser" />
        <blog-card-text v-else :entry="entryTeaser" />
      </div>
      <div class="col-lg-6 col-xl-4 c-card-col" v-if="entries.length > 1">
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
import FeaturedBlogCard from '../components/FeaturedBlogCard.vue'
import LargeBlogCard from '../components/LargeBlogCard.vue'
import LargeBlogCardText from '../components/LargeBlogCardText.vue'
import Loading from '../components/Loading.vue'
import NoResults from '../components/NoResults.vue'
import Pagination from '../components/Pagination.vue'
import PaginationMobile from '../components/PaginationMobile.vue'
import { updateUrl } from '../mixins/updateUrl'
import { EventBus } from "../mixins/event-bus.js";

import gql from "graphql-tag";
import { globalVar } from "../queries/query-resources";

import axios from 'axios';

export default {
  name: "CategoryPage",
  data() {
    return {
      newEntry: [],
      featuredEntries: [],
      entries: [],
      errors: [],
      categryId: "",
      noData: false,
      adLink: "",
      adImage: "",
      childCategoryQuery: "",
      parentCategory: "",
      parentCategorySlug : "",
      paginationMeta : {
        currentPage: 0,
        totalPages: 0
      }
    };
  },
  methods: {
    getEntries: function(changePage){
      if(this.parentCategorySlug == 'books-guides'){
        this.getResources('books-guides');
      }else if(this.parentCategorySlug == 'videos'){
        this.getResources('videos');
      }else if(this.parentCategorySlug == 'case-studies-1'){
        this.getResources('case-studies-1');
      }else if(this.parentCategorySlug == 'tools-templates'){
        this.getResources('tools-templates');
      }
      else{
      let url = '/api/blog/8.json';
      if(this.childCategoryQuery){
        url = url + '?searchCategories=' + this.childCategoryQuery;
      } else {
        url = url + '?searchCategories=' + this.parentCategory;
      }
      if(changePage){
        url = url + '&pg=' + changePage;
      }

      axios.get(url)
      .then(response => {
        if(!changePage){
          this.newEntry = response.data.data.length !== 0 ? [response.data.data[0]] : [];
        }
        this.noData = response.data.data.length === 0;
        this.entries = response.data.data || [];
        // console.log(this.entries);
        this.paginationMeta.currentPage = response.data.meta.pagination.current_page || 0;
        this.paginationMeta.totalPages = response.data.meta.pagination.total_pages || 0;
      })
      .catch(e => {
        this.errors.push(e)
      });
      }
    },
    getFeaturedEntries: function(){
      let url = '/api/featured-blog.json';

      if(this.childCategoryQuery){
        url = url + '?searchCategories=' + this.childCategoryQuery;
      } else {
        url = url + '?searchCategories=' + this.parentCategory;
      }
      axios.get(url).then(response => {
        this.featuredEntries = response.data.data;
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    setQuery: function(query){
      this.entries = [];
      this.noData = false;
      this.childCategoryQuery = query;
      this.getEntries();
      this.getFeaturedEntries();
      this.updateUrl('', this.childCategoryQuery, '');
    },
    setAd: function(categoryData){
      this.adLink = categoryData.adLink || document.getElementById('vue-blog-ad-link').innerHTML;
      this.adImage = categoryData.adImage || document.getElementById('vue-blog-ad-image').innerHTML;
    },
    changePage: function(newPage){
      this.entries = [];
      this.getEntries(newPage);
      this.updateUrl('', this.childCategoryQuery, newPage);
    },
    getNewEntry: function(){
      let entriesUrl = "/api/blog/1.json";
      
      if(this.childCategoryQuery){
        entriesUrl = entriesUrl + '?' + this.childCategoryQuery;
      } else {
        entriesUrl = entriesUrl + '?searchCategories=' + this.parentCategory;
      }

      axios.get(entriesUrl).then(response => {
        this.newEntry = response.data.data || [];
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    getResources: async function (resCat){
      let correctedEbook = [];
      let correctedVideo = [];
      let correctedCaseStudy = [];
      let correctedTools = [];

      try {
        var result = await axios({
          headers: {
            'Authorization': `Bearer `+this.$token,
            'Content-Type' : 'application/json'
          },
          method: "POST",
          url: this.$graphEndpoint,
          data: {
            query: globalVar,
          },
        });
        // console.log(result.data.data.globalSets[0])
        correctedEbook.push(result.data.data.globalSets[0].ebook.map((item)=>{
          return({
            author: {
              id: item.author.id,
              name: item.author.name,
              photo: item.author.photo ? item.author.photo.url : '//d2ydtwisqcxv72.cloudfront.net/_100x100_crop_center-center_none/Copper-icon-square-pink-1.png',
              title: item.author.title
            },
            childCategories: [item.eyebrow],
            description: item.seoDescription,
            featuredArticle: false,
            id: item.id,
            image: item.image[0].url,
            imageGradient: "hot-pink",
            parentCategories: ['ebook'],
            readingTime: null,
            title: item.title,
            url: item.url,
          })
          
        }));

        correctedVideo.push(result.data.data.globalSets[0].video.map((item)=>{
          return({
            author: {
              id: item.author.id,
              name: item.author.name,
              photo: item.author.photo ? item.author.photo.url : '//d2ydtwisqcxv72.cloudfront.net/_100x100_crop_center-center_none/Copper-icon-square-pink-1.png',
              title: item.author.title
            },
            childCategories: [item.eyebrow],
            description: item.seoDescription,
            featuredArticle: false,
            id: item.id,
            image: item.image[0].url,
            imageGradient: "hot-pink",
            parentCategories: ['video'],
            readingTime: null,
            title: item.title,
            url: item.url,
          })
          
        }))

        correctedCaseStudy.push(result.data.data.globalSets[0].caseStudy.map((item)=>{
          return({
            author: {
              id: item.author.id,
              name: item.author.name,
              photo: item.author.photo ? item.author.photo.url : '//d2ydtwisqcxv72.cloudfront.net/_100x100_crop_center-center_none/Copper-icon-square-pink-1.png',
              title: item.author.title
            },
            childCategories: [item.eyebrow],
            description: item.seoDescription,
            featuredArticle: false,
            id: "199182",
            image: item.image[0].url,
            imageGradient: "hot-pink",
            parentCategories: ['case-study'],
            readingTime: null,
            title: item.title,
            url: item.url,
          })
          
        }))

        correctedTools.push(result.data.data.globalSets[0].tools.map((item)=>{
          return({
            author: {
              id: item.author.id,
              name: item.author.name,
              photo: item.author.photo ? item.author.photo.url : '//d2ydtwisqcxv72.cloudfront.net/_100x100_crop_center-center_none/Copper-icon-square-pink-1.png',
              title: item.author.title
            },
            childCategories: [item.eyebrow],
            description: item.seoDescription,
            featuredArticle: false,
            id: "199182",
            image: item.image[0].url,
            imageGradient: "hot-pink",
            parentCategories: ['case-study'],
            readingTime: null,
            title: item.title,
            url: item.url,
          })
          
        }))
        // console.log('rescat : ' + resCat)
        if(resCat == 'books-guides'){
          this.entries = correctedEbook[0];
        }else if(resCat == 'videos'){
          this.entries = correctedVideo[0];
        }
        else if(resCat == 'case-studies-1'){
          this.entries = correctedCaseStudy[0];
        }
        else if(resCat == 'tools-templates'){
          this.entries = correctedTools[0];
        }
        
        // console.log(this.entries)
        
      // this.getStaticJson();
      
        //this.getFeaturedEntries();
      } catch (error) {
        console.error(error);
      }
    }
  },
  // Fetches entries when the component is created.
  created() {
    this.parentCategory = document.getElementById('vue-blog-category').innerHTML || "";
    this.childCategoryQuery = document.getElementById('vue-blog-subcategory-query').innerHTML || '';
    this.parentCategorySlug = document.getElementById('vue-blog-category-slug').innerHTML || '';
    if(this.childCategoryQuery){
      this.adLink = document.getElementById('vue-blog-ad-link--sub').innerHTML || '';
      this.adImage = document.getElementById('vue-blog-ad-image--sub').innerHTML || '';
    } else {
      this.adLink = document.getElementById('vue-blog-ad-link').innerHTML || '';
      this.adImage = document.getElementById('vue-blog-ad-image').innerHTML || '';
    }
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
    BlogCategories,
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