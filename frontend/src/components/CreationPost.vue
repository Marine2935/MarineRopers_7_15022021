<template>
    <div class="mt-5">
        <div class="row justify-content-center">
            <div class="col-8 text-left bg-white d-flex rounded shadow-sm p-3">
                <b-avatar></b-avatar><!-- image profil -->
                <div class="w-100 ml-3">
                    <button class="px-4 py-2 rounded-pill border-0 text-left text-secondary w-100" @click="displayPopup = !displayPopup">
                        Que voulez-vous dire, {{ loggedUser.username }} ?
                    </button>
                </div>
            </div>
        </div>        
        <div class="popup justify-content-center align-items-center" v-show="displayPopup">
            <div class="popup__container p-4 shadow">
                <button class="btn_close p-2" @click="displayPopup = !displayPopup"><b-icon icon="x-circle" font-scale="1.5"></b-icon></button>
                <h3>Créer un nouveau post</h3><hr>
                <div class="text-left">
                    <p><b-avatar></b-avatar><!-- image profil --><span class="ml-3">{{ loggedUser.username }}</span></p><!-- image profil --> <!--{{ username }}-->
                </div>
                <form method="get">
                    <p>
                        <label>Contenu du post</label><br>
                        <textarea class="border-light" name="text_post" rows="6" cols="50" v-model="text" required></textarea>
                    </p>
                    <p>    
                        <label for="file">Ajouter un fichier</label><br>        
                        <input type="file" name="file">
                    </p>
                </form>
            <button class="bg-dark text-white rounded-pill mt-3 px-4 py-2" @click="send">Envoyer</button>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

export default {
    name: 'CreationPost',
    data() {
        return {
            text: '',
            file_name: '',
            displayPopup: false
        }
    },
    props: {
        display: Boolean
    },
    methods: {
        send() {
            let payload = {
                text: this.text,
                file_name: this.file_name,
                user_id: this.loggedUser.id
            }
            http.post('/posts/', payload)
            .then(this.$router.push('/feed'))
            .catch(error => console.log(error));
        }
    },
    computed: {
        ...mapState(['loggedUser'])
    }
}
</script>

<style lang="scss">
.popup {
    display: flex;
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;   
    z-index: 2;
    background: rgba(150, 150, 150, 0.5);
    &__container {
        background-color: #FFFFFF;
        border: 8px solid white;
        border-radius: 8px;
        position: relative;
        min-width: 30%;
        max-width: 100%;
        min-height: 25%;
        max-height: 60%;
    }
}

.btn_close {
    color: #2c3e50!important;
    background: none; 
    border: none;    
    position: absolute;
    top: 0;
    right: 0;
}
</style>