<template>
  <div class="c-blog__categories" v-if="categories.length">
    <pre class="c-plain-eyebrow d-none d-md-block">Filter by category</pre>
    <ul>
      <li 
        v-for="category in categories" 
        @click="setCategoryQuery(category.id)"
        :class="{'active': activeCategory === category.id }" :key="category.id">
        <a><strong>{{ category.title }}</strong></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCategories } from '../mixins/categories';
import { getSubcategories } from '../mixins/subcategories';

export default {
  name: "BlogCategories",
  data() {
    return {
      categories: [],
      categoryQuery: '',
      activeCategory: ''
    };
  },
  created(){
    // Get categories
    if(this.topLevelCategories){
      this.getCategories();
    } else{
      let categryId = document.getElementById('vue-blog-category').innerHTML;
      this.getSubcategories(categryId);
    }

    let subcategory = document.getElementById('vue-blog-subcategory-query').innerHTML || '';
    if(subcategory){
      this.activeCategory = subcategory;
    }
  },
  methods: {
    setCategoryQuery: function(category){
      if(this.activeCategory === '' || this.activeCategory !== category){
        this.activeCategory = category;
        this.$emit('sendQuery', category);
        let found = this.categories.find(function(element) {
          return element.id === category;
        });
        this.$emit('sendAd', found);
      } else {
        this.activeCategory = '';
        this.$emit('sendQuery', '');
      }
    }
  },
  props: {
    categryId:{
      type: String,
      required: false
    },
    topLevelCategories:{
      type: Boolean,
      required: false
    }
  },
  mixins: [
    getCategories,
    getSubcategories
  ]
};
</script>

<style>

</style>