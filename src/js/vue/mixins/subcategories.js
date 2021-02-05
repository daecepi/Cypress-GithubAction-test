import axios from 'axios';

export const getSubcategories = {
  methods: {
    getSubcategories: function(categoryId){
      axios.get('/api/subcategories/' + categoryId+ '.json')
      .then(response => {
        this.categories = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}