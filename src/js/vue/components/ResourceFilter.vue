<template>
	<div>
		<section>
	      <div class="container">
	        <div class="search-bar">
	          <input type="text" placeholder="Search resources..." @change="sendSearch" v-model="theSearchInput" name="search">
	          <span class="search-close"></span>
	        </div>
	        <div class="filter">

	          <p id="filter-header">Filter</p>
	          <span @click='buildFilteredResource(rtype);deselectPill($event)' class="pill" v-for="rtype in resourceTypeSelection">{{getTheRtypeLabel(rtype)}}</span>
	          <span v-if='noSelection' @click="switchRType('index'); clearResources()" class="clear-all">Clear All</span>
	          <ul class="filter-options">
	            <p>Resource Type</p>
	            <li @click="switchRType('all'); buildFilteredResource('all')" data-rtype-name='all' class="filter-option filter-option-resource-type">All</li>
	            <li @click="switchRType('ebook'); buildFilteredResource('ebook')" data-rtype-name='ebook' class="filter-option filter-option-resource-type">Books and Guides</li>
	            <li @click="switchRType('case-study');buildFilteredResource('case-study')" data-rtype-name='case-study' class="filter-option filter-option-resource-type">Customer Stories</li>
	            <li @click="switchRType('video');buildFilteredResource('video')" data-rtype-name='video' class="filter-option filter-option-resource-type">Videos</li>
	            <li @click="switchRType('tools');buildFilteredResource('tools')" data-rtype-name='tools' class="filter-option filter-option-resource-type">Tools and Templates</li>
	          </ul>
	          <ul class="filter-options-hide d-none" >
	            <p>Category</p>
	            <li class="filter-option filter-option-resource-tag">All</li>
	            <li class="filter-option unavailable filter-option-resource-tag">Agencies</li>
	            <li class="filter-option filter-option-resource-tag">Consulting</li>
	            <li class="filter-option filter-option-resource-tag">CRM</li>
	            <li class="filter-option unavailable filter-option-resource-tag">Customer Experience</li>
	            <li class="filter-option filter-option-resource-tag">Marketing</li>
	            <li class="filter-option filter-option-resource-tag">Productivity</li>
	            <li class="filter-option filter-option-resource-tag">Real Estate</li>
	            <li class="filter-option unavailable filter-option-resource-tag">Sales</li>
	            <li class="filter-option filter-option-resource-tag">Technology</li>
	            <li class="filter-option filter-option-resource-tag">Venture Capital</li>
	           </ul>
	        </div>
	      </div>
	    </section>
	</div>
</template>

<script>
	import { EventBus } from '../mixins/event-bus.js'
	export default {
		name: "ResourceFilter",
		data() {
			return {
				theSearchInput: "",
				resourceTypeSelection: [],
				selectedResourceTags: [], 
			}
		},
		methods: {
			switchRType: function(rtype){
				var resObj = {};
				if (rtype == "all") {
					resObj = {pageType: "category", cat: "all"}
				} else if ( rtype == 'index') {
					resObj = {pageType: "index", cat: "none"}
				} else if (rtype == 'search') {
					resObj = {pageType: "search", cat: 'search'}
				} else {
					resObj = {pageType: "category", cat: rtype}
				}
				this.$emit('switchType', resObj);
			},
			buildFilteredResource: function(rtypeName){
				let alreadySelected = this.resourceTypeSelection || [];
				if(rtypeName == 'all'){
					if ( !alreadySelected.includes('all') || alreadySelected === undefined || alreadySelected.length == 0 ) {
						this.resourceTypeSelection = [];
						this.resourceTypeSelection.push(rtypeName);
					} else if ( alreadySelected.includes('all') ) {
						this.switchRType('index')
						this.resourceTypeSelection = [];
					}
				} else {
					if (alreadySelected.includes('all')) {
						this.resourceTypeSelection = [];
						this.resourceTypeSelection.push(rtypeName);
						// this.resourceTypeSelection = alreadySelected.filter(
						// 	function(value, index, arr){
						// 		return value != 'all';
						// 	}
						// );
						// console.log('3 ran: rtype: ' + rtypeName);
					} else if ( alreadySelected.includes(rtypeName) ) {
						var removeMe = alreadySelected.indexOf(rtypeName);
						// this.deselectPill(rtypeName);
						if(removeMe !== -1) alreadySelected.splice(removeMe,1);
						if(alreadySelected.length == 0){
							this.switchRType('index');
						}
					} else {
						this.resourceTypeSelection.push(rtypeName);	
					}
				} 
				EventBus.$emit('resourceSelected', this.resourceTypeSelection);
			}, 
			getTheRtypeLabel: function(rtypeName){
				var theLabel;
				switch (rtypeName) {
					case 'ebook':
						theLabel = 'Books and Guides';
						break;
					case 'tools':
						theLabel = 'Tools and Templates';
						break;
					case 'case-study':
						theLabel = 'Customer Stories';
						break;
					case 'video':
						theLabel = 'Videos';
						break;
					case 'all':
						theLabel = 'All';
						break;
				}
				return theLabel;
			},
			clearResources: function(){
				this.resourceTypeSelection = [];
				$('.filter-option').removeClass('selected');
				$('#filter-header').removeClass('open');
				$('.filter-options').hide();

			},
			deselectPill: function(event){
				$('.filter-option').each(function(index, el) {
					
					if($(el).text() == event.target.innerHTML){
						$(el).removeClass('selected');
					}					
				});
				
			},
			sendSearch: function(){
				this.switchRType('search');
				EventBus.$emit('searching',this.theSearchInput);
			}

		},
		computed: {
			noSelection: function(){
				var yeaOrNeigh;
				if (this.resourceTypeSelection === undefined || this.resourceTypeSelection.length == 0) {
					yeaOrNeigh = false;
				} else {
					yeaOrNeigh = true;
				}
				return yeaOrNeigh;

			}  

		},
		watch: {
			theSearchInput: function(newVal, oldVal){
				this.sendSearch();
			}
		},
		mounted() {
			$('.pill').click(function(event){
				console.log(this.innerText);

			});

			$('p#filter-header').click(function(event) {
				$('.filter-options').toggle();
				$(this).toggleClass('open');
			});
			$('.search-open').click(function(event) {
				$('.filter, .filter-options, .search-open').hide();
				$('.search-bar').show();
				$('p#filter-header').removeClass('open');
				$('.search-bar input').focus();

			});
			$('.search-close').click(function(event) {
				$('.filter, .search-open').show();
				$('.search-bar').hide();
			});
			$('.filter-option-resource-tag').click(function(event) {
				$(this).toggleClass('selected');
			});
			$('.filter-option-resource-type').click(function(event) {
				if ( $(this).text() == "All" ) {
					if ( $(this).hasClass('selected') ) {
						$(this).removeClass('selected')
					} else {
						$(this).parent().find('li.selected').removeClass('selected');
						$(this).toggleClass('selected');
					}
				} else {
					var rTypes = $(this).parent().find('li.selected');
					rTypes.each(function( index, elem ) {
						if( $(elem).text() == 'All'  ) {
							$(elem).removeClass('selected');
						} 						
					});
					$(this).toggleClass('selected');
				}
			});

		},
		mixins: [
			EventBus
		]

	};
</script>