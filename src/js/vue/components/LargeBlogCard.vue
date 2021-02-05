<template>
   <transition name="fade-in">
    <div class="c-blog-card c-blog-card--large"> 
      <a class="c-card__clickthrough" :href="entry.url"></a>
      <div class="c-blog-card__image-container">
        <div v-if="entry.imageGradient" :class="['c-resource--header__gradient', 'c-resource--header__gradient--' + entry.imageGradient ]"></div>
        <img class="c-blog-card__image" :src="entry.image" :alt="entry.title">      
      </div>
      <div class="c-blog-card__content c-blog-card__content--large">
        <span class="t-eyebrow ">{{ entry.childCategories[0] || entry.parentCategories [0] }} <span v-if="entry.readingTime">: {{ entry.readingTime }} read</span></span>
        <h3 class="c-blog-card__content__title c-blog-card__content__title--large">
          {{entry.title}}
        </h3>
        <p class="c-blog-card__content__subtitle c-blog-card__content__subtitle--large p-sm no-margin d-none d-sm-block">{{ entry.description }}</p>
        <div class="c-blog-card__content__author">
          <div class="c-author">
            <div v-if="entry.author.photo" :class="['circle-img c-author__img', 
            'background-' +random(entry.author.id)]" :style="{'background-image': 'url(' +entry.author.photo + ')'}">
            </div>
            <div v-else :class="['circle-img c-author__img', 'c-author__img', 'background-' +random(entry.author.id)]">
              <span v-if="!entry.author.photo" class="c-author__img--alt">{{ entry.author.name[0] }}</span>
            </div>
            <div class="c-author__meta">
              <p class="p-sm  no-margin"><strong>{{ entry.author.name }}</strong></p>
              <p class="p-sm no-margin" v-if="entry.author.title" >{{ entry.author.title }}</p>
              <p class="p-sm no-margin" v-else >Contributor</p>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </transition>
</template>

<script>
export default {
  name: "LargeBlogCard",
  props: {
    entry:{
      type: Object,
      required: true
    }
  },
  methods: {
    random: function(id){
      return (id%2) +1;
    } 
  }
};
</script>

<style>

</style>