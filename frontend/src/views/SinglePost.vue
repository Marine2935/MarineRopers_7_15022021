<template>
    <div>
        <UsersList />
        <div class="container mt-5">
            <div class="row justify-content-center">
                <Post :post="post" :type="'single_post'" v-if="post" />
            </div>
            <FormPost />
            <div v-for="comment in comments" :key="comment.id">
                <Comment :comment="comment" @deleted="deleteComment" />            
            </div>
            <div class="container mt-4 p-0">
                <div class="row justify-content-center">
                    <div class="col-8 bg-white rounded shadow-sm p-3">
                        <AddComment @added="addComment" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import AddComment from '@/components/AddComment';
import Comment from '@/components/Comment';
import FormPost from '@/components/FormPost';
import Post from '@/components/Post';
import UsersList from '@/components/UsersList';

export default {
    name: 'SinglePost',

    components: {
        AddComment,
        Comment,
        FormPost,
        Post,
        UsersList
    },

    data() {
        return {
            comments: null,
            post: null            
        }
    },

    created() {
        http.get(`/posts/${this.$route.params.post_id}`)
        .then(response=> this.post = response.data)
        .catch(error => console.log(error));  
        
        http.get(`/posts/${this.$route.params.post_id}/comments/`)
        .then(response => {
            this.comments = response.data})
        .catch(error => console.log(error));
    },
    
    methods: {   
        addComment(comment) {
            this.comments.splice(0, 0, comment)
        },

        deleteComment(comment_id) {
            let object = '';
            
            this.comments.forEach((comment) => {
                if (comment.id === comment_id) {
                    object = comment;
                }
            });

            let index = this.comments.indexOf(object); 
            
            this.comments.splice(index, 1);
        }
    }
}
</script>

<style lang="scss">
.button {
    background-color: transparent;
}
</style>