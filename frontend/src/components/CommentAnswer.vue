<template>
    <div class="row justify-content-center">
        <div class="col-2 my-3 pt-1">
            <b-avatar :src="answer.user.avatar_url"></b-avatar>              
        </div>
        <div class="test col my-2">
            <div class="row bg-white rounded shadow-sm p-3">
                <div class="col pl-1">
                    <div class="text-left align-items-center">                    
                        <router-link class="font-weight-bold m-0 username" title="Voir tous ses posts" :to="{ name: 'UserPosts', params: { user_id: `${answer.user.id}`, username: `${answer.user.username}` } }">
                            {{ answer.user.username }}
                        </router-link>                   
                    </div>
                    <div class="my-2 text-left">
                        {{ answer.text }}
                    </div>
                </div>
               <CommentParams :type="'answer'" :answer_id="answer.id" :comment_id="answer.comment_id" v-show="loggedUser.id === answer.user_id || loggedUser.isAdmin" />
            </div>
            <div class="row justify-content-between mt-2">
                <div class="col text-right">
                    <span v-if="answer.date_answer_sec < 60">{{ answer.date_answer_sec }}s</span>
                    <span v-if="answer.date_answer_min < 60 && answer.date_answer_min !== 0">{{ answer.date_answer_min }}min</span>
                    <span v-if="answer.date_answer_hour < 24 && answer.date_answer_hour !== 0">{{ answer.date_answer_hour }}h</span>
                    <span v-if="answer.date_answer_day < 30 && answer.date_answer_day !== 0">{{ answer.date_answer_day }}j</span>  
                    <span v-if="answer.date_answer_month < 12 && answer.date_answer_month !== 0">{{ answer.date_answer_month }} mois</span>
                    <span v-if="answer.date_answer_year !== 0">{{ answer.date_answer_year }} année<span v-if="answer.date_answer_year > 1">s</span></span>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import CommentParams from '@/components/CommentParams';
import { mapState } from "vuex";

export default {
    name: 'CommentAnswer',

    components: {
        CommentParams
    },

    props: {
        answer: Object
    },
    
    computed: {
        ...mapState(['loggedUser'])        
    }
}
</script>