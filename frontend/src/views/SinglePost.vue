<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <Post :post="post" :type="'single_post'" v-if="post" />
        </div>
        <FormPost />
        <AllComments />
        <AddComment />
    </div>
</template>

<script>
import http from '@/http';
import Post from '@/components/Post';
import FormPost from '@/components/FormPost';
import AllComments from '@/components/AllComments';
import AddComment from '@/components/AddComment';

export default {
    name: 'SinglePost',
    components: {
        Post,
        FormPost,
        AllComments,
        AddComment
    },
    data() {
        return {
            post: null
        }
    },
    created() {
        http.get(`/posts/${this.$route.params.post_id}`)
        .then(response=> this.post = response.data)
        .catch(error => console.log(error));       
    }
}
</script>