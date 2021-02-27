<template>
    <div class="mt-5">
        <div class="row justify-content-center">
            <div class="col-8 text-left bg-white d-flex rounded shadow-sm p-3 align-items-center">
                <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar><!-- image profil -->
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
                <form @submit.prevent="send">
                    <div class="form-group">
                        <label>Contenu du post</label><br>
                        <textarea class="form-control border-light" name="text_post" rows="6" cols="50" v-model="text" required></textarea>
                    </div>
                    <div class="form-group">    
                        <label for="file">Ajouter un fichier</label><br>
                        <div class="mt-2 mb-3" v-if="filePreview">
                            <img :src="this.filePreview" size="6rem" />    
                        </div>        
                        <input type="file" name="file" @change="onFileUpload">
                    </div>
                    <button class="bg-dark text-white rounded-pill mt-3 px-4 py-2" @click="send">Envoyer</button>
                </form>
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
            file: null,
            filePreview: '',
            displayPopup: false
        }
    },
    props: {
        display: Boolean
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    methods: {
        onFileUpload(event) {
            this.file = event.target.files[0];
            this.createImage(this.file);
        },

        createImage(file) {
            let reader = new FileReader();

            reader.onload = () => {
                this.filePreview = reader.result;
            };
            reader.readAsDataURL(file);
        },

        send() {
            let post = {
                text: this.text,
                user_id: this.loggedUser.id
            }

            const formData = new FormData();
            formData.append('user', JSON.stringify(post));
            formData.append('file', this.file, this.file.name);

            http.post('/posts/', formData)
            .then(this.displayPopup = !this.displayPopup)
            .catch(error => console.log(error));
        }
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