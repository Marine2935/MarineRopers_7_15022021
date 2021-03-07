<template>
    <div class="row justify-content-center">
        <div class="col-1 my-3 pt-1">
            <b-avatar :src="comment.user.avatar_url"></b-avatar>              
        </div>
        <div class="test col-7 my-2">
            <div class="row bg-white rounded shadow-sm p-3">
                <div class="col pl-1">
                    <div class="text-left align-items-center">                    
                        <router-link class="font-weight-bold m-0 username" title="Voir tous ses posts" :to="{ name: 'UserPosts', params: { user_id: `${comment.user.id}`, username: `${comment.user.username}` } }">
                            {{ comment.user.username }}
                        </router-link>                   
                    </div>
                    <div class="my-2 text-left">
                        {{ comment.text }}
                    </div>
                </div>
                <CommentParams :type="'comment'" :comment_id="comment.id" :post_id="comment.post_id" v-show="loggedUser.id === comment.user_id || loggedUser.isAdmin" />
            </div>
            <div class="row justify-content-between mt-2"> 
                <div class="col text-left d-flex ">
                    <Reactions :type="'comment'" :commentId="comment.id"/>
                    <button class="border-0 font-weight-bold text-dark button ml-3" @click="displayAddAnswer = !displayAddAnswer">Répondre</button>
                </div>
                <div class="col text-right">
                    <span v-if="comment.date_comment_sec < 60">{{ comment.date_comment_sec }}s</span>
                    <span v-if="comment.date_comment_min < 60 && comment.date_comment_min !== 0">{{ comment.date_comment_min }}min</span>
                    <span v-if="comment.date_comment_hour < 24 && comment.date_comment_hour !== 0">{{ comment.date_comment_hour }}h</span>
                    <span v-if="comment.date_comment_day < 30 && comment.date_comment_day !== 0">{{ comment.date_comment_day }}j</span>  
                    <span v-if="comment.date_comment_month < 12 && comment.date_comment_month !== 0">{{ comment.date_comment_month }} mois</span>
                    <span v-if="comment.date_comment_year !== 0">{{ comment.date_comment_year }} année<span v-if="comment.date_comment_year > 1">s</span></span>
                </div>
            </div>
            <div v-if="answers && answers.length !== 0">
                <a href="#" class="font-weight-bold" aria-label="Afficher les réponses" @click="showAnswers = !showAnswers">
                    Voir <span v-if="answers.length === 1">la</span><span v-if="answers.length > 1">les {{ answers.length }}</span> réponse<span v-if="answers.length > 1">s</span>
                    <b-icon class="ml-1" icon="caret-down-fill"></b-icon>
                </a>
                <div v-if="showAnswers">
                    <div v-for="answer in answers" :key="answer.id">
                        <CommentAnswer :answer="answer" />
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-end" v-if="displayAddAnswer">
                <div class="col bg-white rounded shadow-sm p-3">
                    <AddComment :type="'answer'" :commentId="comment.id" /> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import AddComment from '@/components/AddComment';
import CommentAnswer from '@/components/CommentAnswer';
import CommentParams from '@/components/CommentParams';
import Reactions from '@/components/Reactions';
import { mapState } from "vuex";

export default {
    name: 'Comment',
    components: { 
        AddComment, 
        CommentAnswer,      
        CommentParams,
        Reactions
    },
    data () {
        return {
            answers: null,
            displayAddAnswer: false,
            showAnswers: false
        }
    },
    props: {
        comment: Object
    },
    computed: {
        ...mapState(['loggedUser'])        
    },
    created() {
        http.get(`/posts/${this.$route.params.post_id}/comments/${this.comment.id}/answers`)
        .then(response => this.answers = response.data)
        .catch(error => console.log(error));
    }
}
</script>