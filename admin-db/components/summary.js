const app = Vue.createApp({
    data() {
      return {
        cardsData: []
      };
    },
    mounted() {
      fetch('jsons/summary.json')
        .then(response => response.json())
        .then(data => {
          this.cardsData = data.summary;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  });
  
  app.component('card-component', {
    props: {
      data: Object
    },
    template: `
      <div class="card comp-card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="m-b-25">{{ data ? data.title : 'No title' }}</h6>
              <h3 class="f-w-700" :class="textColor">{{ data ? data.value : 'No value' }}</h3>
              <p class="m-b-0">{{ data ? data.duration : 'No duration' }}</p>
            </div>
            <div class="col-auto" :class="cardClass">
              <i :class="iconClass"></i>
            </div>
          </div>
        </div>
      </div>
    `,
    computed: {
        textColor() {
            if (this.data && this.data.title === 'Impressions') {
                return 'text-c-blue';
            } else if (this.data && this.data.title === 'Goal') {
                return 'text-c-green';
            } else if (this.data && this.data.title === 'Impact') {
                return 'text-c-yellow';
            } else {
              return '';
            }
          },
      cardClass() {
        if (this.data && this.data.title === 'Impressions') {
          return 'bg-c-blue';
        } else if (this.data && this.data.title === 'Goal') {
          return 'bg-c-green';
        } else if (this.data && this.data.title === 'Impact') {
          return 'bg-c-yellow';
        } else {
          return '';
        }
      },
      iconClass() {
        if (this.data && this.data.title === 'Impressions') {
          return 'fas fa-eye';
        } else if (this.data && this.data.title === 'Goal') {
          return 'fas fa-bullseye';
        } else if (this.data && this.data.title === 'Impact') {
          return 'fas fa-hand-paper';
        } else {
          return '';
        }
      }
    }
  });
  
  app.mount('#summary');
  