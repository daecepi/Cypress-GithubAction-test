<template>
	<div class="row">
		<div class="col-md-6">
			<div class="c-resources-card newsletter-signup-card">
			  <h2>Get the latest sales and marketing insights in your inbox.</h2>
			  <form>
			    <input id="emailAddress" maxlength="100" class="input-newsletter" name="emailAddress" type="email" placeholder="email@example.com">
			    <button @submit.prevent="submitTheForm()" id="buttonSubmit" class="submit-newsletter"></button>
			  </form>
			</div>
		</div>
	    <div class="col-md-6">
	      <div class="c-resources-card medium-card">
	        <a class='c-card_clickthrough image-wrap' :href="entry.url"></a>
	        <div class="c-resources-card__image-container">
	          <img class="img-fluid" :src="(entry.images[0]) ? entry.images[0].large : entry.image[0]" alt="Fluid image">
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
	</div>
</template>
<script>
	export default {
		name: "ResourceNewsletterCard",
		data() {
			return {
				emailAddress: ""
			}
		},
		props: {
			entry: {
				type: Object,
				required: true
			}
		},
		methods: {
			submitTheForm: function(event){
                event.preventDefault();
                var form = MktoForms2.getForm(1942);
                var theEmail = document.getElementById('emailAddress').value;
                form.vals({
                    "Email": theEmail
                });
                form.submit();
                $('#buttonSubmit').addClass('button-submitted');
                $('input.input-newsletter').attr('placeholder', 'Thanks for signing up!');


			}
		},
		mounted() {
			$('input[name="emailAddress"]').focus(function(event) {
				$('#buttonSubmit').addClass('move-me')
			});
			$('input[name="emailAddress"]').blur(function(event) {
				$('#buttonSubmit').removeClass('move-me')
			});
		}		
	}
</script>