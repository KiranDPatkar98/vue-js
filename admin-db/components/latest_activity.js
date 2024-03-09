const latestActivity = Vue.createApp({
    data() {
      return {
        latestData: []
      };
    },
    mounted() {
      fetch('jsons/Latest_Activity.json')
        .then(response => response.json())
        .then(data => {
          this.latestData = data.latest_activity;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  });
  
  latestActivity.component('latest-component', {
    props: {
      data: Object
    },
    template: `
    <div class="row p-t-20 p-b-30">
    <div class="col-auto text-right update-meta p-r-0">
      <i class="b-primary update-icon ring"></i>
    </div>
    <div class="col p-l-5">
      <a href="#!"><h6>{{data.activity_type}}</h6></a>
      <p class="text-muted m-b-0">{{data.activity}} <a href="#!" class="text-c-blue"> Read More</a></p>
    </div>
  </div>
    `,
   
  });
  
  latestActivity.mount('#latestActivity');
  