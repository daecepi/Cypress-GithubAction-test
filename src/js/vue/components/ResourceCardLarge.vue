<template>
	<div class="c-resources-card large-card">
	  <a class='c-card_clickthrough image-wrap' :href="entry.url"></a>
	  <div class="c-resources-card__image-container">
	    <img class="" :src="(entry.images[0]) ? entry.images[0].large : entry.image[0]" alt="Blog image card large">
	  </div>
	  <div class="c-resource-card__content">
		<span v-if="entry.type.toLowerCase() == 'ebook'" class="t-eyebrow t-eyebrow--lt-pink">Books & Guides</span>
		<span v-else-if="entry.type.toLowerCase() == 'video'" class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
		<span v-else-if="entry.type.toLowerCase() == 'case-study'" class="t-eyebrow t-eyebrow--lt-mint">Customer Stories</span>
		<span v-else class="t-eyebrow t-eyebrow--lt-blue">Tools & Templates</span>
	    <h3 class="c-resource-card__content__title">{{entry.title}}</h3>
	    <p class="short-description c-blog-card__content__subtitle">{{entry.seoDescription}}</p>
		<a v-if="entry.eyebrow == 'video' " :href="entry.url" class="c-button c-button--white-outline-black-text">Watch Now</a>
		<a v-else :href="entry.url" class="c-button c-button--white-outline-black-text">Read More</a>
	  </div>
	</div>
</template>
<script>
	export default {
		name: "ResourceCardLarge",
		props: {
			entry: {
				type: Object,
				required: true
			}
		}
	}
</script>