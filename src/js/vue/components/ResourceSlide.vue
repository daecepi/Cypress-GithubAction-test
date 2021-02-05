<template>
	<div>
		<div class="c-resources-card__image-container">
			<img class="img-fluid" :src="entry.images[0].slide" alt="Fluid image">
		</div>
		<div class="container">
			<div class="c-resource-card__content">
				<span v-if="entry.type == 'ebook'" class="t-eyebrow t-eyebrow--lt-pink">Books & Guides</span>
				<span v-else-if="entry.type == 'video'" class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
				<span v-else-if="entry.type == 'caseStudy'" class="t-eyebrow t-eyebrow--lt-mint">Customer Stories</span>
				<span v-else class="t-eyebrow t-eyebrow--lt-blue">Tools & Templates</span>
				<h2>{{entry.title}}</h2>
				<a v-if="entry.eyebrow == 'video' " :href="entry.url" class="c-button c-button--white-outline-black-text">Watch Now</a>
				<a v-else :href="entry.url" class="c-button c-button--white-outline-black-text">Read More</a>
			</div>
		</div>
	</div>	
</template>
<script>
	export default {
		name: "ResourceSlide",
		props: {
			entry: {
				type: Object,
				required: true,
			}
		},
		computed: {
			linkText: function(eyebrow){
				let theText = '';
				if (eyebrow == 'video'){
					theText = 'Watch Now';
				} else {
					theText = 'Read More';
				}
				return theText;
			}
		}
	}
</script>
