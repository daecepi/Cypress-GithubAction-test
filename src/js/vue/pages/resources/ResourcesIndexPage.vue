<template>
  <div>  
    <resource-slider /> 
    <three-up-recents/>
  </div> 
</template>

<script>
import ResourceSlider from '../../components/ResourceSlider.vue'
import ThreeUpRecents from '../../components/ThreeUpRecents.vue'
import { EventBus } from '../../mixins/event-bus.js'
import axios from 'axios';

export default {
  name: "ResourcesIndexPage",
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
      let entriesUrl = "/api/all-resources.json";
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
    //this.getEntries();
    //this.getFeaturedEntries();
  },
  components: {
    ResourceSlider,
    ThreeUpRecents,
  },
  mixins: [
    EventBus
  ],
};
</script>

<style>

</style>