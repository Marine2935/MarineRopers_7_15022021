<template>
    <div class="container mt-5">
        <SinglePost />
        <AllComments />
        <AddComment />
    </div>
</template>

<script>
import SinglePost from '@/components/SinglePost.vue';
import AllComments from '@/components/AllComments.vue';
import AddComment from '@/components/AddComment.vue';

export default {
    name: 'Post',
    components: {
        SinglePost,
        AllComments,
        AddComment
    }
}
</script>