<template>
    <div class="container mt-5">
        <SinglePost />
        <AllComments />
        <AddComment />
    </div>
</template>

<script>
import SinglePost from '@/components/SinglePost';
import AllComments from '@/components/AllComments';
import AddComment from '@/components/AddComment';

export default {
    name: 'Post',
    components: {
        SinglePost,
        AllComments,
        AddComment
    }
}
</script>