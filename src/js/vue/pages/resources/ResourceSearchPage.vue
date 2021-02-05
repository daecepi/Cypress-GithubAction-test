<template>
  <div>
    <section id="library-sections">
      <div class="container">
        <div class="row">
          <div :class="['col-md-4']" v-for="(entry, index) in filteredList">
            <resource-card-small :entry="entry"/>     
          </div>
          <div v-show='false' :class="['col-md-4']" v-for="(entry, index) in resourcesByType">
            <resource-card-small :entry="entry"/>     
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ResourceCardSmall from '../../components/ResourceCardSmall.vue'
  import { updateUrl } from '../../mixins/updateUrl'
  import { EventBus } from '../../mixins/event-bus.js'


import axios from 'axios';

import gql from 'graphql-tag';
import {globalVar} from '../../queries/query-resources';

export default {
  name: "ResourceSearchPage",
  data() {
    return {
      searchText: "",
      filteredSearch:[],
      newEntry: [],
      selectedResources: [],
      filteredResources: [],
      allResources: [],
      featuredEntries: [],
      entries: [],
      resourcesByType: [],
      res: [],
      allRes: [],
      errors: [],
      categryId: "",
      noData: false,
      adLink: "",
      adImage: "",
      childCategoryQuery: "",
      parentCategory: "",
    };
  },
  props: {
    catType: {
      type: String,
      required: false
    },
    searchQuery: {
      type: String, 
      required: false
    }
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
      })
      .catch(e => {
        this.errors.push(e)
      });
    },
    getResourceEntries: function(selectedResources, allResources){
      this.resourcesByType = [];
      let posts = allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
      if (selectedResources.includes('all')){
        this.resourcesByType = posts;
      } else {
        for (var i = posts.length - 1; i >= 0; i--) {
          if( selectedResources.includes( posts[i].eyebrow.toLowerCase() ) ) {
            this.resourcesByType.push(posts[i]);
          }
        }
      }
    },
    // getStaticJson: function(){
    //   let entriesUrl = "/js/all-resources.json";
    //   axios.get(entriesUrl).then(response => {
    //     this.allResources = response.data.data || [] ;
    //     let posts = this.allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
    //     this.resourcesByType = posts;
        
    //   })
    //   .catch(e => {
    //     this.errors.push(e)
    //   });
    // },
    getStaticJson: function(){
      let theResources = this.res;
        this.allResources = theResources || [] ;
        //let posts = this.allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
        let posts = this.allResources;
        for(var i = 0 ; i <= Object.keys(posts).length - 1 ; i++ ){
          for(var j = 0 ; j <= posts[Object.keys(posts)[i]].length -1 ; j++){
            if(Object.keys(posts)[i] == "caseStudy"){
              posts[Object.keys(posts)[i]][j]["type"] = "case-study";  
            }else{
              posts[Object.keys(posts)[i]][j]["type"] = Object.keys(posts)[i];  
            }
            this.allRes.push(posts[Object.keys(posts)[i]][j]);
          }
        }        
        this.allResources = this.allRes || [] ;
        this.resourcesByType = this.allRes;

        
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
    }, 
    filterResources: function(){
      let posts = allResources;

    }
  },
  // Fetches entries when the component is created.
  created() {
    // Check for page number query
    //this.getEntries();
    this.getStaticJson();
    // //this.getFeaturedEntries();
    EventBus.$on('resourceSelected', selRes => {
      this.selectedResources = selRes;
    });
    EventBus.$on('searching', daSearch => {
      this.searchText = daSearch;
    })
  },
  mounted(){
    this.$on('switchType', () => {
    });
    if ( this.selectedResources.length == 0 ) {
      if (this.$props.catType == 'all') {
        this.getResourceEntries([this.$props.catType],this.allResources);
      } else {
        this.selectedResources.push(this.$props.catType );
      }
    }
    // this.filteredList();
    // this.getResourceEntries(this.$props.catType);
    // console.log(this.entries);
  },
  async mounted(){
    try{
      var result = await axios({
        headers: {
          'Authorization': `Bearer `+this.$token,
          'Content-Type' : 'application/json'
        },
        method:"POST",
        url: this.$graphEndpoint,
        data:{
          query:globalVar
        }
      });
      this.res = result.data.data.globalSets[0];
      this.getStaticJson();
      
    } catch (error){
      console.error(error);
    }
  },
  watch: {
    // catType: function(newVal, oldVal){
    //   this.getResourceEntries( newVal, this.allResources );
    // },
    selectedResources: function(newVal, oldVal){
      this.getResourceEntries( newVal, this.allResources );
    },
    // searchText: function(){
    //   this.filteredList();
    // }
  },
  computed: {
    // FIX ME 
    filteredList() {
      return this.resourcesByType.filter( entry => {
        return entry.title.toLowerCase().includes( this.$props.searchQuery.toLowerCase() )
        // return entry.title.toLowerCase().includes( this.searchText.toLowerCase() )
      })
    }

  },
  components: {
    ResourceCardSmall
  },
  mixins: [
    updateUrl,
    EventBus
  ],
};
</script>

<style>

</style>