<template>
  <div>
    <category-page v-if="pageType === 'category' " />
    <featured-page v-else-if="pageType === 'featured' " />
    <index-page v-else-if="pageType === 'index' " />
    <search-page v-else-if="pageType === 'search' " />
    <author-detail-page v-else-if="pageType === 'authordetail' " />
    <author-page v-else-if="pageType === 'author' " />
  </div>  
</template>

<script>
import CategoryPage from './pages/CategoryPage.vue'
import FeaturedPage from './pages/FeaturedPage.vue'
import IndexPage from    './pages/IndexPage.vue'
import SearchPage from    './pages/SearchPage.vue'
import AuthorDetailPage from    './pages/AuthorDetailPage.vue'
import AuthorPage from    './pages/AuthorPage.vue'


export default {
  data() {
    return {
      pageType: ""
    };
  },
  methods: {
  },
  // Fetches entries when the component is created.
  created() {
    this.pageType = document.getElementById('vue-blog-page-type').innerHTML;
  },
  components: {
    CategoryPage,
    FeaturedPage,
    IndexPage,
    AuthorDetailPage,
    AuthorPage,
    SearchPage
  },
};
</script>

<style>

</style>