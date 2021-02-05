<template>
  <div>
    <div id="library-body">
      <section id="booksAndGuides">
        <div class="container">
          <div class="row">
            <div class="col-7 col-sm-9">
              <h3 class="section-title">Books & Guides</h3>
            </div>
            <div class="col-5 col-sm-3 text-right">
              <a
                v-on:click.stop="clickViewAll('ebook')"
                class="categories-link"
              ></a>
            </div>
          </div>
          <div class="row">
            <resource-card-small
              :class="'col-lg-4'"
              v-for="(resourceEntry, index) in getResourceEntries(
                'ebook'
              )"
              :key="resourceEntry.id"
              :entry="resourceEntry"
            />
          </div>
        </div>
      </section>
      <section id="videos">
        <div class="container">
          <div class="row">
            <div class="col-7 col-sm-9">
              <h3 class="section-title">Videos</h3>
            </div>
            <div class="col-5 col-sm-3 text-right">
              <a
                v-on:click.stop="clickViewAll('video')"
                class="categories-link"
              ></a>
            </div>
          </div>
          <div class="row">
            <resource-card-small
              :class="'col-lg-4'"
              v-for="(resourceEntry, index) in getResourceEntries(
                'video'
              ).slice(0, 3)"
              :key="resourceEntry.id"
              :entry="resourceEntry"
            />
          </div>
        </div>
      </section>
      <section id="customerStories">
        <div class="container">
          <div class="row">
            <div class="col-7 col-sm-9">
              <h3 class="section-title">Customer Stories</h3>
            </div>
            <div class="col-5 col-sm-3 text-right">
              <a
                v-on:click.stop="clickViewAll('case-study')"
                class="categories-link"
              ></a>
            </div>
          </div>
          <div class="row">
            <resource-card-small
              :class="'col-lg-4'"
              v-for="(resourceEntry, index) in getResourceEntries(
                'caseStudy'
              ).slice(0, 3)"
              :key="resourceEntry.id"
              :entry="resourceEntry"
            />
          </div>
        </div>
      </section>
      <section id="toolsAndTemplates">
        <div class="container">
          <div class="row">
            <div class="col-7 col-sm-9">
              <h3 class="section-title">Tools & Templates</h3>
            </div>
            <div class="col-5 col-sm-3 text-right">
              <a
                v-on:click.stop="clickViewAll('tools')"
                class="categories-link"
              ></a>
            </div>
          </div>
          <div class="row">
            <resource-card-small
              :class="'col-lg-4'"
              v-for="(resourceEntry, index) in getResourceEntries(
                'tools'
              ).slice(0, 3)"
              :key="resourceEntry.id"
              :entry="resourceEntry"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>

import ResourceCardSmall from "./ResourceCardSmall.vue";
import axios from "axios";
import { EventBus } from "../mixins/event-bus.js";

import gql from "graphql-tag";
import { globalVar } from "../queries/query-resources";

export default {
  name: "ThreeUpFilter",
  data() {
    return {
      newEntry: [],
      featuredEntries: [],
      entries: [],
      allResources: [],
      resourcesByType: [],
      errors: [],
      noData: false,
      adLink: "",
      adImage: "",
      res: [],
      allRes: [],
      paginationMeta: {
        currentPage: 0,
        totalPages: 0,
      },
    };
  },
  methods: {
    getEntries: function(changePage) {
      let entriesUrl = "/js/all-resources.json";
      axios
        .get(entriesUrl)
        .then((response) => {
          this.noData = response.data.data.length === 0;
          this.entries = response.data.data || [];
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    // getStaticJson: function(){
    //   let entriesUrl = "/js/all-resources.json";
    //   axios.get(entriesUrl).then(response => {
    // 	this.allResources = response.data.data || [] ;
    // 	this.entries = response.data.data || [];
    //   })
    //   .catch(e => {
    //     this.errors.push(e)
    //   });
    // },
    getStaticJson: function() {
      // console.log("executes get static jason")
      // let entriesUrl = "/js/all-resources.json";

      //Response separated by category
      let theResources = this.res;

      // let posts = this.allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
	  let posts = theResources;
      for (var i = 0; i <= Object.keys(posts).length - 1; i++) {
        for (var j = 0; j <= posts[Object.keys(posts)[i]].length - 1; j++) {
          if (Object.keys(posts)[i] == "caseStudy") {
            posts[Object.keys(posts)[i]][j]["type"] = "case-study";
          } else {
            posts[Object.keys(posts)[i]][j]["type"] = Object.keys(posts)[i];
          }
          this.allRes.push(posts[Object.keys(posts)[i]][j]);
        }
      }
      this.allResources = this.allRes || [];
      this.entries = this.allRes || [];
    },
    getResourceEntries: function(catType) {
    	let threeEntries = [];
		//let posts = this.entries;
	  	let posts = this.res;
    //   for (var i = posts.length - 1; i >= 0; i--) {
    //     if (posts[i].type.toLowerCase() == catType) {
    //       threeEntries.push(posts[i]);
    //     }
  //   }
    if(Object.keys(posts).length){
      
      for (var i = 0; i <= 2; i++) {
        // if (posts[catType][i].type.toLowerCase() == catType) {
          if(catType == 'caseStudy'){
            Object.values(posts[catType]).reverse()[i]["type"] = "case-study";
            // posts[catType][posts[catType].length -1 - i]["type"] = "case-study";
            threeEntries.push(Object.values(posts[catType]).reverse()[i]);
          }else{
            
            //console.log(catType + " length : "+ posts[catType].length)
            threeEntries.push(Object.values(posts[catType]).reverse()[i]);
          }
        
        // }
      }
    }
		
		return threeEntries;
    },
    getFeaturedEntries: function() {
      let url = "/api/featured-blog.json";
      axios
        .get(url)
        .then((response) => {
          this.featuredEntries = response.data.data || [];
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getNewEntry: function() {
      let entriesUrl = "/api/blog/1.json";
      axios
        .get(entriesUrl)
        .then((response) => {
          this.newEntry = response.data.data || [];
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    changePage: function(newPage) {
      this.entries = [];
      this.getEntries(newPage);
      this.updateUrl("", "", newPage);
    },
    clickViewAll: function(rtype) {
      var resObj = {};
      if (rtype == "all") {
        resObj = { pageType: "index", cat: "none" };
      } else {
        resObj = { pageType: "category", cat: rtype };
      }
      EventBus.$emit("viewAllClicked", resObj);
      window.scrollTo(0, 0);
    },
  },
  computed: {},
  async mounted() {
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
      this.res = result.data.data.globalSets[0];
      
    this.getStaticJson();
    
      //this.getFeaturedEntries();
    } catch (error) {
      console.error(error);
    }
  },
  // Fetches entries when the component is created.
  created() {
    // Check for page number query
    // this.getEntries();
  },
  components: {
    ResourceCardSmall,
  },
  mixins: [EventBus],
};
</script>
