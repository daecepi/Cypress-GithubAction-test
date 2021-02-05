<template>
  <div>
    <section id="library-sections">
      <div class="container">
        <div class="row">
          <!-- <div v-for="ty in allRes">
            <h3>{{ty.title}}</h3>
          </div> -->
          <div :class="[  {'col-sm-12': [0,9,17].includes(index)},
                          {'col-sm-12': index == 3}, 
                          {'col-sm-6': [1,2,4,5,10,11,12,13,18,19,20,21].includes(index)}, 
                          {'col-md-4': [6,7,8,14,15,16].includes(index)},
                          {'mb-4': [8,16].includes(index)},
                          {'col-md-4': index > 21 } ]" v-for="(entry, index) in resourcesByType">
            <resource-card-large v-if="[0,9,17].includes(index)" :entry="entry" />
            <resource-newsletter-card v-else-if="index == 3" :entry="entry"/>
            <resource-card-medium v-else-if="[1,2,4,5,10,11,12,13,18,19,20,21].includes(index)" :index="index" :entry="entry"/>
            <resource-card-small v-else-if="[6,7,8].includes(index)" :index="index" :entry="entry"/>
            <resource-card-small v-else :entry="entry"/>     
          </div>
                               
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ResourceCardLarge from '../../components/ResourceCardLarge.vue'
  import ResourceCardMedium from '../../components/ResourceCardMedium.vue'
  import ResourceCardSmall from '../../components/ResourceCardSmall.vue'
  import ResourceNewsletterCard from '../../components/ResourceNewsletterCard.vue'
  import { updateUrl } from '../../mixins/updateUrl'
  import { EventBus } from '../../mixins/event-bus.js'
  

import axios from 'axios';

import gql from 'graphql-tag';
import {globalVar} from '../../queries/query-resources';



export default {
  name: "ResourceTypePage",
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
      errors: [],
      categryId: "",
      noData: false,
      adLink: "",
      adImage: "",
      res: [],
      allRes: [],
      count: 0,
      childCategoryQuery: "",
      parentCategory: ""
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
      // let posts = allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
      let posts = allResources;
      // let posts = allResources;      
      if (selectedResources.includes('all')){
        for (var i = 0; i <= posts.length - 1; i++) {
          if(posts[i].type != "featuredResources"){
            this.resourcesByType.push(posts[i]);
          }
        }
        //this.resourcesByType = posts;
      } else {
        // for( var item = 0  ; item <=posts[selectedResources.replace("-","")].length - 1; item++){
          
        //   posts[selectedResources.replace("-","")][item]["type"] = selectedResources
        // }
        // this.resourcesByType = posts[selectedResources];
        
        for (var i = 0; i <= posts.length - 1; i++) {
      
      
          if(selectedResources.includes("case-study")){
            if(posts[i].type == "caseStudy"){
              posts[i]["type"] = "case-study";
              // this.resourcesByType.push(posts[i]);
            }
          }
          if( selectedResources.includes( posts[i].type.toLowerCase() ) ) {
            this.resourcesByType.push(posts[i]);
          }
        }
        
      }
    },
    getStaticJson: function(){
      // let entriesUrl = "/js/all-resources.json";
      
        // let posts = this.allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
        let posts = this.res;
        for(var i = 0 ; i <= Object.keys(posts).length - 1 ; i++ ){
          for(var j = 0 ; j <= posts[Object.keys(posts)[i]].length -1 ; j++){
            posts[Object.keys(posts)[i]][j]["type"] = Object.keys(posts)[i];
            this.allRes.push(posts[Object.keys(posts)[i]][j]);
          }
        }
        // this.allResources = this.allRes.sort((a, b) => (a.id > b.id) ? 1 : -1) || [] ;
        this.allResources = this.allRes.reverse() || [] ;


        if (this.$props.catType == 'all') {
          for (var i = this.allResources.length - 1; i >= 0; i--) {
            if(this.allResources[i].type != "featuredResources"){
              if(this.allResources[i].type == "caseStudy"){
                this.allResources[i]["type"] = "case-study";
                this.resourcesByType.push(this.allResources[i]);
              }else{
                this.resourcesByType.push(this.allResources[i]);
              }
            }
          }
          //this.resourcesByType = this.allRes || [];
        } else {
          
          if (this.$props.catType == "case-study"){
            posts["caseStudy"].reverse();
            for( var item = 0  ; item <= posts["caseStudy"].length - 1 ; item++){
              posts["caseStudy"][item]["type"] = this.$props.catType
            }
            // this.resourcesByType = posts["caseStudy"].sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.resourcesByType = posts["caseStudy"];

          }else {
            posts[this.$props.catType.replace("-","")].reverse();
            for( var item = 0  ; item <= posts[this.$props.catType.replace("-","")].length - 1 ; item++){
              posts[this.$props.catType.replace("-","")][item]["type"] = this.$props.catType
            }
            // this.resourcesByType = posts[this.$props.catType.replace("-","")].sort((a, b) => (a.id > b.id) ? 1 : -1);
            this.resourcesByType = posts[this.$props.catType.replace("-","")];

            
          }
        }
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
    // this.getEntries();
    //this.getStaticJson();
    // //this.getFeaturedEntries();
    // EventBus.$on('resourceSelected', selRes => {
    //   this.selectedResources = selRes;
    // });
    // EventBus.$on('searching', daSearch => {
    //   this.searchText = daSearch;
    // })
  },
  mounted(){
    this.$on('switchType', () => {
      
    });
    if ( this.selectedResources.length == 0 ) {
      if (this.$props.catType == 'all') {
        this.getResourceEntries([this.$props.catType],this.allResources);
      } else {
        if(this.selectedResources.includes("case-study")){
          this.selectedResources.includes("case-study").replace("case-study","caseSudy")
        }else{
          this.selectedResources.push(this.$props.catType );
        }
        
      }
    }
    // this.getResourceEntries(this.$props.catType);
    // this.getStaticJson();
    //   //this.getFeaturedEntries();
    //   EventBus.$on('resourceSelected', selRes => {
    //   this.selectedResources = selRes;
    //   });
    //   EventBus.$on('searching', daSearch => {
    //   this.searchText = daSearch;
    // })
  
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
      
      // for(var i = 0 ; i <= Object.keys(this.res).length - 1 ; i++ ){
      //     for(var j = 0 ; j <= Object.keys(this.res[i]).length -1 ; j++){
      //       this.res[i][j]["type"] = Object.keys(this.res[i]);
      //       this.allRes.push(this.res[i][j]);
      //     }
      // }

      this.getStaticJson();
      //this.getFeaturedEntries();
      EventBus.$on('resourceSelected', selRes => {
      this.selectedResources = selRes;
      });
      EventBus.$on('searching', daSearch => {
      this.searchText = daSearch;
    })
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
    }
  },
  computed: {
    // FIX ME 
    filteredList() {
      return this.resourcesByType.filter(post => {
        return post.title.toLowerCase().includes(this.searchText.toLowerCase())
      })
    }

  },
  components: {
    ResourceCardLarge,
    ResourceCardMedium,
    ResourceNewsletterCard,
    ResourceCardSmall,
  },
  mixins: [
    updateUrl,
    EventBus
  ],
};
</script>

<style>

</style>