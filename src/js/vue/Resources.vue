<template>
  <div>
    <ResourceFilter @switchType="changeResourceType" />
    <div id="library-body">
      <ResourcesIndexPage @switchType="changeResourceType" v-if="pageType === 'index' "  />
      <ResourceTypePage v-else-if="pageType === 'category'" :catType="theCatType" :searchQuery="searchQuery" />
      <ResourceSearchPage v-else-if="pageType === 'search'" :searchQuery="searchQuery" :catType="theCatType" />
    </div>
  </div>  
</template>

<script>
import ResourceFilter from  './components/ResourceFilter.vue'
import ResourcesIndexPage from    './pages/resources/ResourcesIndexPage.vue'
import ResourceTypePage from    './pages/resources/ResourceTypePage.vue'
import ResourceSearchPage from    './pages/resources/ResourceSearchPage.vue'
import { EventBus } from './mixins/event-bus.js'

export default {
  data() {
    return {
      pageType: "",
      currentRType: "ResourcesIndexPage",
      theRtype: "main page",
      theCatType: "",
      searchQuery: ""
    };
  },
  methods: {
    changeResourceType: function(theResourceType) {
      this.pageType = theResourceType.pageType;
      this.theCatType = theResourceType.cat;
    },
  },
  created() {
    this.pageType = document.getElementById('vue-resource-type').innerHTML;
    EventBus.$on('viewAllClicked', resObj => {
     this.changeResourceType(resObj);
    });
    EventBus.$on('searching', search => {
      this.searchQuery = search;
    })
  },
  components: {
    ResourceFilter,
    ResourcesIndexPage,
    ResourceTypePage,
    ResourceSearchPage
  },
  mixins: [
    EventBus
  ],
};
</script>

<style>

</style>