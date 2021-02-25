<template>
    <AllPosts :type="'user_posts'" />
</template>

<script>
import AllPosts from '@/components/AllPosts';

export default {
    name: 'UserPosts',
    components: {
        AllPosts
    }
}
</script>