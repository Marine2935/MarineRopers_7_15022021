<template>
    <div>
        <UsersList class="d-none d-lg-flex" />
        <div class="container mt-3">
            <div class="row justify-content-center mb-4">
                <Post :changeCount="changeCount" :post="post" :type="'single_post'" v-if="post" />
            </div>
            <FormPost @updated="updatePost" />
            <div v-for="comment in comments" :key="comment.id">
                <Comment :comment="comment" @answer="updateCount" @deleted="deleteComment" />            
            </div>
            <div class="container mt-5 p-0">
                <div class="row justify-content-center">
                    <div class="col-lg-8 bg-white rounded shadow-sm p-3">
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
            changeCount: 0,
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
            this.comments.splice(0, 0, comment);
            this.updateCount('add');
        },

        deleteComment(comment_id, answers_length) {
            let object = '';
            
            this.comments.forEach((comment) => {
                if (comment.id === comment_id) {
                    object = comment;
                }
            });

            let index = this.comments.indexOf(object); 
            
            this.comments.splice(index, 1);
            this.updateCount('deleteAll', answers_length);
        },

        updateCount(type, answers) {
            if (type === 'add') {
                this.changeCount++;
            } else if (type === 'del') {
                this.changeCount--;
            } else {
                this.changeCount = this.changeCount - (1 + answers)
            }
        },

        updatePost(updatePost) {  
            this.post = updatePost;
        }       
    }
}
</script>

<style lang="scss">
.button {
    background-color: transparent;
}
</style>