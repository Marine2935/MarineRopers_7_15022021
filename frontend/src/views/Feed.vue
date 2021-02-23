<template>
    <div class="home">        
        <CreationPost />
        <AllPosts />
    </div>
</template>

<script>
import CreationPost from '@/components/CreationPost';
import AllPosts from '@/components/AllPosts';

export default {
    name: 'Feed',
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