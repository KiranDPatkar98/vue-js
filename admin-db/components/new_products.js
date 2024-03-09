const newProducts = Vue.createApp({
    data() {
      return {
        newProducts: []
      };
    },
    mounted() {
      fetch('jsons/New_Products.json')
        .then(response => response.json())
        .then(data => {
          this.newProducts = data.new_products;
          console.log(this.newProducts)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  });
  
  newProducts.component('product-component', {
    props: {
      data: Object
    },
    template: `
    <tr>
    <td>{{data.name}}</td>
    <td>{{data.product_code}}</td>
    <td>{{data.customer}}</td>
    <td><label class="label" :class="color">{{data.status}}</label></td>
    <td>
    <a href="#!" v-for="i in 5" :key="i">
      <i class="fa" :class="['fa-star', 'f-12', i <= data.rating ? 'text-c-yellow' : 'text-default']"></i>
    </a>
  </td>
  
  </tr>
    `,

computed:{
    color(){
        if (this.data && this.data.status === 'Out Stock') {
            return 'label-danger';
        }else{
            return 'label-success'
        }
    }
}
   
  });
  
  newProducts.mount('#newProducts');
  