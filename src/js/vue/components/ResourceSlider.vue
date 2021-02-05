<template>
	<div>
		<section id="library-slider" class="c-hero c-hero--library-slider">
			<div class="slider-wrapper">
				<div class="c-resources-card slide" v-for='slide in sliderEntries.slice(0,4)'>
					<resource-slide :entry='slide' />
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
	import ResourceSlide from './ResourceSlide.vue'
	import axios from 'axios';

	import gql from 'graphql-tag';
	import {globalVar} from '../queries/query-resources';

	export default {
		name: "ResourceSlider",
		data(){
			return {
				slideIndex: 1,
				sliderEntries: [],
				entries: [],
				res: [],
      			allRes: [],
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
			getStaticJson: function(changePage){
				// let entriesUrl = "/js/all-resources.json";
				let theResources = this.res;
				// let posts = this.allResources.sort((a, b) => (a.id > b.id) ? 1 : -1);
				let posts = this.res
				// for(var i = 0 ; i <= Object.keys(posts).length - 1 ; i++ ){
				// 	for(var j = 0 ; j <= posts[Object.keys(posts)[i]].length -1 ; j++){
				// 		posts[Object.keys(posts)[i]][j]["type"] = Object.keys(posts)[i];
				// 		this.allRes.push(posts[Object.keys(posts)[i]][j]);
				// 	}
				// }
				
				for(var i = 0 ; i <= Object.keys(posts.featuredResources).length - 1 ; i++ ){
					if( JSON.stringify(Object.values(posts.ebook)).includes(JSON.stringify(posts.featuredResources[i])) ){
						posts.featuredResources[i]["type"] = "ebook";
						console.log("Ebook vamos: "+posts.featuredResources[i].title)
					}
					if( JSON.stringify(Object.values(posts.tools)).includes(JSON.stringify(posts.featuredResources[i])) ){
						posts.featuredResources[i]["type"] = "tools";
						console.log("tools vamos: "+posts.featuredResources[i].title)
					}
					if( JSON.stringify(Object.values(posts.caseStudy)).includes(JSON.stringify(posts.featuredResources[i])) ){
						posts.featuredResources[i]["type"] = "caseStudy";
						console.log("casestudy vamos: "+posts.featuredResources[i].title)
					}
					if( JSON.stringify(Object.values(posts.video)).includes(JSON.stringify(posts.featuredResources[i])) ){
						posts.featuredResources[i]["type"] = "video";
						console.log("video vamos: "+posts.featuredResources[i].title)
					}
					
						this.allRes.push(posts.featuredResources[i]);					
				}
				this.entries = this.allRes || [] ;
				// let slides = this.entries.sort((a, b) => (a.id > b.id) ? 1 : -1);
				let slides = this.entries;
		        for (var i = slides.length - 1; i >= 0; i--) {
		        	// if (slides[i].type == "featuredResources") {
		        		this.sliderEntries.push(slides[i]);
		        	// }
				}
				
			}
		},
		created() {
			// this.getEntries();
			//this.getStaticJson();
		},
		mounted(){		
			//this.showSlides(this.slideIndex)			
			
		},
		async mounted(){
			try{
			var result = await axios({
				headers: {
				'Authorization': `Bearer `+this.$token,
				'Content-Type' : 'application/json'
				},
				method:"POST",
				url: this.$graphEndpoint,
				data:{
				query:globalVar
				}
			});
			this.res = result.data.data.globalSets[0];
			
			// for(var i = 0 ; i <= Object.keys(this.res).length - 1 ; i++ ){
			//     for(var j = 0 ; j <= Object.keys(this.res[i]).length -1 ; j++){
			//       this.res[i][j]["type"] = Object.keys(this.res[i]);
			//       this.allRes.push(this.res[i][j]);
			//     }
			// }

			this.getStaticJson();
			//this.getFeaturedEntries();
			
			} catch (error){
			console.error(error);
			}
		},
		components: {
			ResourceSlide,
		}
	}

</script>