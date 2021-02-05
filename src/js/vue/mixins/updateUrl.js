export const updateUrl = {
  methods: {
    updateUrl: function(searchQuery, subCategory, newPage){
      let newUrl = window.location.pathname + '?';

      if(searchQuery){
        newUrl = newUrl + 'q=' + searchQuery + '&';
      }
      if(subCategory){
        newUrl = newUrl + 'sc=' + subCategory + '&';
      }
      if(newPage){
        newUrl = newUrl + 'pg=' + newPage;
      }
      if(newUrl.endsWith('&') || newUrl.endsWith('?')){
        newUrl = newUrl.substring(0, newUrl.length - 1);
      }
      history.pushState('', '', newUrl); 
    }
  }
}