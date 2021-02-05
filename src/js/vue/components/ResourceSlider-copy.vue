<template>
	<div>
		<section id="library-slider" class="c-hero c-hero--library-slider">
			<div class="slider-wrapper">
				<div class="c-resources-card slide">
					<div class="c-resources-card__image-container">
						<picture>
          <source type="image/webp" srcset="/imgs/placeholder/resources/Cover_withLogos22.webp"  class="img-fluid"   alt="Resources card cover image">
          <source type="image/png" srcset="/imgs/placeholder/resources/Cover_withLogos22.png"  class="img-fluid"   alt="Resources card cover image">
          <img   class="img-fluid"   src="/imgs/placeholder/resources/Cover_withLogos22.png"   alt="Resources card cover image" >
</picture>
					</div>
					<div class="container">
						<div class="c-resource-card__content">
							<span class="t-eyebrow t-eyebrow--lt-pink">Books & Guides</span>
							<h2>How to Seal the Deal</h2>
							<a href="https://www.copper.com/resources/how-to-seal-the-deal" class="c-button c-button--white-outline-black-text">Read More</a>
						</div>
					</div>
				</div>	
				<div class="c-resources-card slide">
					<div class="c-resources-card__image-container">
						<picture>
          <source type="image/webp" srcset="imgs/general/vue/190423_Webinar_MaximizingROI.webp"  class="img-fluid"   alt="Webinar maximization image">
          <source type="image/png" srcset="imgs/general/vue/190423_Webinar_MaximizingROI.jpg"  class="img-fluid"   alt="Webinar maximization image">
          <img   class="img-fluid"   src="imgs/general/vue/190423_Webinar_MaximizingROI.jpg"   alt="Webinar maximization image" >
</picture>

					</div>
					<div class="container">
						<div class="c-resource-card__content">
							<span class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
							<h2>Maximizing Your CRM ROI</h2>
							<a href="https://www.copper.com/webinars/maximizing-your-crm-roi" class="c-button c-button--white-outline-black-text">Read More</a>
						</div>
					</div>
				</div>	
				<div class="c-resources-card slide">
					<div class="c-resources-card__image-container">
						<picture>
          <source type="image/webp" srcset="imgs/general/vue/190423_Webinar_HelloCopper.webp"  class="img-fluid"   alt="Hello Copper webinars image">
          <source type="image/png" srcset="imgs/general/vue/190423_Webinar_HelloCopper.jpg"  class="img-fluid"   alt="Hello Copper webinars image">
          <img   class="img-fluid"   src="imgs/general/vue/190423_Webinar_HelloCopper.jpg"   alt="Hello Copper webinars image" >
</picture>

					</div>
					<div class="container">
						<div class="c-resource-card__content">
							<span class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
							<h2>The 7 Habits Reps Need to Crush Their Quota</h2>
							<a href="https://www.copper.com/webinars/the-7-habits-reps-need-to-crush-their-quota" class="c-button c-button--white-outline-black-text">Read More</a>
						</div>
					</div>
				</div>	
				<div class="c-resources-card slide">
					<div class="c-resources-card__image-container">
						<picture>
          <source type="image/webp" srcset="imgs/general/vue/190514_Webinar_SpreadsheetstoCRM-hero.webp"  class="img-fluid"   alt="Webinar spreadsheet webinars image">
          <source type="image/png" srcset="imgs/general/vue/190514_Webinar_SpreadsheetstoCRM-hero.jpg"  class="img-fluid"   alt="Webinar spreadsheet webinars image">
          <img   class="img-fluid"   src="imgs/general/vue/190514_Webinar_SpreadsheetstoCRM-hero.jpg"   alt="Webinar spreadsheet webinars image" >
</picture>

					</div>
					<div class="container">
						<div class="c-resource-card__content">
							<span class="t-eyebrow t-eyebrow--lt-purple">Videos</span>
							<h2>Moving from spreadsheets to a CRM</h2>
							<a href="https://www.copper.com/webinars/spreadsheets-to-crm" class="c-button c-button--white-outline-black-text">Read Now</a>
						</div>
					</div>
				</div>	
				<!-- Next and previous buttons -->
				<a class="slider-control prev" @click="plusSlides(-1)"><span></span></a>
				<a class="slider-control next" @click="plusSlides(1)"><span></span></a>
				<div class="indicators">
					<div class="container">
						<span class="indicator-line active" @click="currentSlide(1)"></span>
						<span class="indicator-line" @click="currentSlide(2)"></span>
						<span class="indicator-line" @click="currentSlide(3)"></span>
						<span class="indicator-line" @click="currentSlide(4)"></span>
					</div>
				</div>		
			</div>
		</section>
	</div>
</template>
<script>
	//import ResourceSlide from './ResourceSlide.vue'
	import axios from 'axios';

	export default {
		name: "ResourceSlider",
		data(){
			return {
				slideIndex: 1,
				sliderEntries: [],
			    entries: [],
			}
		},
		methods: {
			plusSlides: function(n) {
			  this.showSlides(this.slideIndex += n);
			},
			currentSlide: function(n) {
			  this.showSlides(this.slideIndex = n);
			},
			showSlides: function(n){
			  var i;
			  var slides = document.getElementsByClassName("slide");
			  var dots = document.getElementsByClassName("indicator-line");
			  if (n > slides.length) {this.slideIndex = 1}
			  if (n < 1) {this.slideIndex = slides.length}
			  for (i = 0; i < slides.length; i++) {
			      slides[i].style.display = "none";
			  }
			  for (i = 0; i < dots.length; i++) {
			      dots[i].className = dots[i].className.replace(" active", "");
			  }
			  dots[this.slideIndex-1].className += " active";
			  slides[this.slideIndex-1].style.display = "block";
			},
		    getEntries: function(changePage){
		      let entriesUrl = "/api/all-resources.json";
		      // if(changePage){
		      //   entriesUrl = entriesUrl + '?pg=' + changePage;
		      // }
		      axios.get(entriesUrl).then(response => {
		        // if(!changePage){
		        //   this.newEntry = response.data.data.length !== 0 ? [response.data.data[0]] : [];
		        // }
		        // this.noData = response.data.data.length === 0;
		        this.entries = response.data.data || [];
		        // this.paginationMeta.currentPage = response.data.meta.pagination.current_page;
		        // this.paginationMeta.totalPages = response.data.meta.pagination.total_pages;
		      })
		      .catch(e => {
		        this.errors.push(e)
		      });
		    },
		},
		created() {
			this.getEntries();
		},
		mounted(){		
			this.showSlides(this.slideIndex)			
			
		},
		components: {
			//ResourceSlide,
		}
	}

</script>