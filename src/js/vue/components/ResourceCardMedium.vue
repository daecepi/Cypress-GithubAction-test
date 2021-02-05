<template>
    <div>
      <div class="c-resources-card medium-card">
        <a class='c-card_clickthrough image-wrap' :href="entry.url"></a>
        <div class="c-resources-card__image-container">
          <img class="img-fluid" :src="(entry.images[0]) ? entry.images[0].large : entry.image[0]" alt="Blog image medium card">
        </div>
        <div class="c-resource-card__content">
            <span v-if="entry.type.toLowerCase() == 'ebook'" class="t-eyebrow t-eyebrow--lt-pink">Books & Guides</span>
            <span v-else-if="entry.type.toLowerCase() == 'video'" class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
            <span v-else-if="entry.type.toLowerCase() == 'case-study'" class="t-eyebrow t-eyebrow--lt-mint">Customer Stories</span>
            <span v-else class="t-eyebrow t-eyebrow--lt-blue">Tools & Templates</span>
          <h3 class="c-resource-card__content__title">{{entry.title}}</h3>
          <p class="short-description c-blog-card__content__subtitle">{{entry.description}}</p>
          <a href="" class="c-button c-button--white-outline-black-text">Read More</a>
        </div>
      </div>
    </div>
</template>
<script>
  import ResourceNewsletterCard from './ResourceNewsletterCard.vue'
	export default {
		name: "ResourceCardMedium",
		props: {
			entry: {
				type: Object,
				required: true
			},
      index: {
        type: Number,
        required: false
      }
		},
    components: {
      ResourceNewsletterCard
    }
	}
</script>