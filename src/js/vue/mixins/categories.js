import axios from 'axios';

export const getCategories = {
  methods: {
    getCategories: function(){
      axios.get(`/api/categories.json`)
      .then(response => {
        this.categories = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}