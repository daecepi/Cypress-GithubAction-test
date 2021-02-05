<template>
	<div>
		<div class="c-resources-card small-card">
			<a class='c-card_clickthrough' :href="entry.url"></a>
			<img class="img-fluid" :src="(entry.images[0]) ? entry.images[0].medium : entry.image[0]" alt="Blog image card small">
			<div class="c-resource-card__content">
				<span v-if="entry.type.toLowerCase() == 'ebook'" class="t-eyebrow t-eyebrow--lt-pink">Books & Guides</span>
				<span v-else-if="entry.type.toLowerCase() == 'video'" class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
				<span v-else-if="entry.type.toLowerCase() == 'case-study'" class="t-eyebrow t-eyebrow--lt-mint">Customer Stories</span>
				<span v-else class="t-eyebrow t-eyebrow--lt-blue">Tools & Templates</span>
				<h3 class="c-resource-card__content__title">{{entry.title}}</h3>
				<p class="short-description c-blog-card__content__subtitle p-sm no-margin d-none d-md-flex">{{entry.description}}</p>
				<script v-if="entry.type.toLowerCase() == 'ebook'" type="application/ld+json">
					{
					"@context": "https://schema.org",
					"@type": "Book",
					"author": {
						"@type": "Organization",
						"name": "Copper"
					},
					"bookFormat": "http://schema.org/EBook",
					"datePublished": "{{ entry.postDate|atom }}",
					"image": "{{ entry.image[0].url }}",
					"inLanguage": "English",
					"name": "{{entry.title}}",
					"publisher": "Copper",
					"aggregateRating": {
						"@type": "AggregateRating",
						"ratingValue": "4.5",
						"reviewCount": "60"
					},
					"offers":{
						"@type": "AggregateOffer",
						"offerCount": "3",
						"lowPrice": "19",
						"highPrice": "119",
						"availability": "https://schema.org/OnlineOnly",
						"priceCurrency": "USD"
					}
				}
				</script>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "ResourceCardSmall",
	props: {
		entry:{
			type: Object,
			required: true
		}
	},
	methods: {
		setEyebrow: function(entryEyebrow){


		},
	}
};
</script>