<template>
  <div class="c-pagination">
    <div :class="['t-strikethrough', 'c-pagination__previous', {'c-pagination--disabled': currentPage <= 1}]" @click="changePage(currentPage - 1)" rel="prev" :href="getSEOUrl(currentPage - 1)">
      <div class="t-strikethrough__container">
        <pre class="c-pagination__text">Prev</pre>
        <div class="t-strikethrough__container__title t-strikethrough__container__title--pagination"></div>
      </div>
    </div>

    <!-- First num -->
    <div class="c-pagination__extremity" v-if="currentPage > 5">
      <div class="t-strikethrough c-pagination__number" @click="changePage(1)">
        <div class="t-strikethrough__container">
          <pre class="c-pagination__text">1</pre>
          <div class="t-strikethrough__container__title t-strikethrough__container__title--pagination"></div>
        </div>
      </div>
      <pre class="c-pagination__ellipsis c-pagination__text">...</pre>
    </div>

    <!-- Low range -->
    <div class="t-strikethrough c-pagination__number" :class="{'active': n === currentPage}" v-for="n in getLowRange()" :key="n" @click="changePage(n)">
      <div class="t-strikethrough__container">
        <pre class="c-pagination__text">{{n}}</pre>
        <div class="t-strikethrough__container__title t-strikethrough__container__title--pagination"></div>
      </div>
    </div>

     <!-- High range -->
    <div class="c-pagination__extremity" v-if="totalPages > 5 && currentPage <=  (Math.floor(this.totalPages/5) * 5)">
      <pre class="c-pagination__ellipsis c-pagination__text">...</pre>
      <div class="t-strikethrough c-pagination__number"  :class="{'active': totalPages === currentPage}" v-for="n in getHighRange()" :key="n" @click="changePage(n)">
        <div class="t-strikethrough__container">
          <pre class="c-pagination__text">{{n}}</pre>
          <div class="t-strikethrough__container__title t-strikethrough__container__title--pagination"></div>
        </div>
      </div>
    </div>

    <div :class="['t-strikethrough', 'c-pagination__next', {'c-pagination--disabled': currentPage >= totalPages}]" @click="changePage(currentPage + 1)" rel="next" :href="getSEOUrl(currentPage + 1)">
      <div class="t-strikethrough__container">
        <pre class="c-pagination__text">Next</pre>
        <div class="t-strikethrough__container__title t-strikethrough__container__title--pagination"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Pagination",
  props: {
    currentPage:{
      type: Number,
      required: true
    },
    totalPages:{
      type: Number,
      required: true
    },
    scrollOffset: {
      type: Number,
      // required: true
    }
  },
  data() {
    return {
      totalPages: 0,
      currentPage: 0,
      range: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    getSEOUrl: function(pageNumber){
      if(pageNumber > 0 && pageNumber <= this.totalPages){
        let search = '?';
        if(window.location.search){
          search = window.location.search.split('pg=')[0];
          if(!search.endsWith('&') ){
            search += '&';
          }
        }
        return window.location.origin + window.location.pathname + search + 'pg=' + pageNumber;
      }
    },
    getLowRange: function(){
      let highestMultipleOfFive = Math.floor(this.totalPages/5) * 5;
      if( this.currentPage > highestMultipleOfFive ){
        return Array.from( this.range, x => x + this.totalPages - 5 ).filter(x => x > 0);
      } else{ 
        return Array.from( this.range, x => x + ( Math.floor( ( this.currentPage - 1 ) / 5 ) * 5 ) );
      }
    },
    getHighRange: function(){
      if (this.currentPage < 6){
        return Array.from( this.range, x => x + ( this.totalPages - 5 ) ).filter(x => x >= 6);
      } else {
        return [this.totalPages]
      }
    },
    showHigh: function(){
      return Math.floor(this.totalPages / 5)
    },
    changePage: function(newPage){
      if(newPage && newPage !== this.currentPage && newPage <= this.totalPages  ){
        window.scrollTo({
          top: this.findPos(document.getElementById("topOfPagination")) - this.scrollOffset,
          behavior: 'smooth' //desktop smooth
        })
        this.currentPage = newPage;
        this.$emit('changePage', newPage);
      }
    },
    findPos: function(obj) {
      var curtop = 0;
      if (obj.offsetParent) {
          do {
              curtop += obj.offsetTop;
          } while (obj = obj.offsetParent);
      return [curtop];
      }
    }
  }

};
</script>

<style>

</style>