<template>
  <div class="c-author c-author--cickable"> 
    <a class="c-card__clickthrough" :href="'/blog/authors/'+ author.UserName"></a>
    <div v-if="author.photo" :class="['circle-img c-author__img', 'background-' +random(author.id)]" :style="{'background-image': 'url(' + author.photo + ')'}">
    </div>
    <div v-else :class="['circle-img c-author__img', 'background-' +random(author.id)]">
      <span class="c-author__img--alt">{{ author.FirstName[0] }}</span>
    </div>
    <div class="c-author__meta-container">
      <div class="c-author__meta">
        <p class="p-sm no-margin"><strong>{{ author.FullName }}</strong></p>
        <p class="p-sm no-margin" v-if="author.JobTitle" >{{ author.JobTitle }}</p>
        <p class="p-sm no-margin" v-else >Contributor</p>
      </div>
      <div class="c-author__link">
        <a class="t-link">See all articles</a>
      </div>     
    </div>     
  </div>  
</template>


<script>
export default {
  name: "AuthorList",
  props: {
    author:{
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