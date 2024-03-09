const progress = Vue.createApp({
    data() {
      return {
        progressData: []
      };
    },
    mounted() {
      fetch('jsons/Project_Progress_Summary.json')
        .then(response => response.json())
        .then(data => {
          this.progressData = data.project_progress_summary;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  });
  
  progress.component('progress-component', {
    props: {
      data: Object
    },
    template: `
    <div class="col-xl-3 col-md-6">
    <h6>{{ data ? data.title : 'No title' }}</h6>
    <h5 class="m-b-30 f-w-700">{{ data ? data.value : 'No value' }}<span class="m-l-10" :class="textColor">{{ data ? data.percentage : 'No value' }}</span></h5>
    <div class="progress">
        <div class="progress-bar" :class="progressColor"  :style="{ width: width }"></div>
    </div>
</div>
</div>
    `,

    computed: {
        progressColor() {
            if (this.data && this.data.title === 'Published Project') {
                return 'bg-c-red';
            } else if (this.data && this.data.title === 'Completed Task') {
                return 'bg-c-blue';
            } else if (this.data && this.data.title === 'Successfull Task') {
                return 'bg-c-green';
            } else {
              return 'bg-c-yellow';
            }
          },
      width() {
        if (this.data && this.data.title === 'Published Project') {
          return '25%';
        } else if (this.data && this.data.title === 'Completed Task') {
          return '65%';
        } else if (this.data && this.data.title === 'Successfull Task') {
          return '85%';
        } 
        else if (this.data && this.data.title === 'Ongoing Project') {
            return '45%';
        }
          else {
          return '';
        }
      },
      textColor(){
        if (this.data && this.data.title === 'Completed Task') {
            return 'text-c-red';
          }else{
            return 'text-c-green'
          }
      }

    }
   
  });
  
  progress.mount('#project-info');
  