<template>
   <transition name="fade-in">
     <div class="c-copper-chronicles__ad">
      <a :href="link" v-if="image && link">
        <img class="c-copper-chronicles__ad__img" alt="Chronicles image" :src="image">
      </a>
      <a href="/infographic_roi-survey_impact-of-crm-in-the-relationship-era" v-else>
        <picture>
          <source type="image/webp" srcset="/imgs/blog/AD-1--uncle-crm.webp"  class="c-copper-chronicles__ad__img" alt="AD-1 uncle crm image"  >
          <source type="image/png" srcset="/imgs/blog/AD-1--uncle-crm.jpg"  class="c-copper-chronicles__ad__img" alt="AD-1 uncle crm image"  >
          <img   class="c-copper-chronicles__ad__img" alt="AD-1 uncle crm image"   src="/imgs/blog/AD-1--uncle-crm.jpg"   >
</picture>
      </a>
    </div> 
  </transition>
</template>


<script>
export default {
  name: "Ad",
  props: {
    link:{
      type: String,
    },
    image:{
      type: String,
    },
  },
};
</script>

<style scoped>

</style>
