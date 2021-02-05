<template>
   <transition name="fade-in">
    <div class="c-blog-featured-card"> 
      <a class="c-card__clickthrough" :href="entry.url"></a>  
      <div  class="c-blog-card__content--featured">
        <span class="t-eyebrow ">
          <strong>{{ entry.childCategories[0] || entry.parentCategories [0] }} <span class="d-inline-block d-md-none" v-if="entry.readingTime">: {{ entry.readingTime }} read</span>
          </strong>
        </span>
        <p v-if="entry.consolidatedTitle" class="c-blog-featured-card__title p-sm no-margin">
          {{entry.consolidatedTitle}}
        </p>
        <p v-else class="c-blog-featured-card__title p-sm no-margin">
          {{entry.title}}
        </p>
      </div>
      <div class="c-blog-featured-card__image">
        <div v-if="entry.imageGradient" :class="['c-resource--header__gradient', 'c-resource--header__gradient--' + entry.imageGradient ]"></div>
        <img v-if="entry.image"  class="c-blog-card__image d-none d-md-block" :src="entry.image" :alt="entry.title"> 
        <img v-else  class="c-blog-card__image d-none d-md-block" src="//d2ydtwisqcxv72.cloudfront.net/placeholder.svg" :alt="entry.title">   
      </div>
    </div>  
  </transition>
</template>

<script>
export default {
  name: "FeaturedBlogCard",
  props: {
    entry:{
      type: Object,
      required: true
    }
  }
};
</script>

<style>

</style>