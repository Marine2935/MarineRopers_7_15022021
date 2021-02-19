<template>
  <div class="home">
    <button @click="test">Bouton</button>
    <CreationPost />   
  </div>
</template>

<script>
import CreationPost from '@/components/CreationPost.vue';
import http from '../http';

export default {
  name: 'Home',
  components: {
    CreationPost
  },
  methods: {
    test() {
      http.get('/posts/')
      .then(response => console.log(response));
    }
  }
}
</script>
