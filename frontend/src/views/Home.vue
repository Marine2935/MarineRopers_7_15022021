<template>
    <div class="home">        
        <CreationPost />
        <AllPosts />
    </div>
</template>

<script>
import CreationPost from '@/components/CreationPost.vue';
import AllPosts from '@/components/AllPosts.vue';

export default {
    name: 'Home',
    components: {
        CreationPost,
        AllPosts
    }    
}
</script>

<style lang="scss">
a {
    cursor: pointer;
    text-decoration: none!important;
}
</style>