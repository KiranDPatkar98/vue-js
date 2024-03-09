const newTask = Vue.createApp({
    data() {
      return {
        newData: []
      };
    },
    mounted() {
      fetch('jsons/Whats_New.json')
        .then(response => response.json())
        .then(data => {
          this.newData = data.what_new_items;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  });
  
  newTask.component('new-task-component', {
    props: {
      data: Object
    },
    template: `
    <div class="row p-t-20 p-b-30">
    <div class="col-auto text-right update-meta p-r-0">
    <img v-if="shouldRenderImage" :src="img" alt="user image" class="img-radius img-40 align-top m-r-15 update-icon" />
    <i v-else class="feather  update-icon" :class="img"></i>
    </div>
    <div class="col p-l-5">
      <a href="#!"><h6>{{data.message}}</h6></a>
      <p class="text-muted m-b-0">{{data.created_by}}</p>
    </div>
  </div>
    `,

    computed: {
        img() {
            if (this.data && this.data.message === 'Your Manager Posted.') {
                return '/template_files/avatar-4.jpg';
            } else if (this.data && this.data.message === 'You have 3 pending Task.') {
                return 'icon-briefcase bg-c-red';
            } else if (this.data && this.data.message === 'New Order Received.') {
                return 'icon-check bg-c-green';
            } else {
              return '';
            }
          },
          shouldRenderImage() {
            return this.data.message === 'Your Manager Posted.';
          }
    }
   
  });
  
  newTask.mount('#newTask');
  