<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-8 bg-white rounded shadow-sm p-3">
                <b-avatar></b-avatar><!-- image profil -->
                <button class="ml-3 px-4 py-2 rounded-pill border-0 w-75 text-left text-secondary" @click="displayPopup = !displayPopup">Que voulez-vous dire, <!--{{ user.first_name ou username }}--> ?</button>
            </div>
        </div>
        <div v-show="displayPopup" class="popup justify-content-center align-items-center">
            <div class="popup__container p-4 shadow">
                <button class="btn_close p-2" @click="displayPopup= !displayPopup"><b-icon icon="x-circle" font-scale="1.5"></b-icon></button>
                <h2>Créer un nouveau post</h2>
                <div>
                    <!-- image profil --> <!--{{ username }}-->
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
            <button @click="send">Envoyer</button>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../http';

export default {
    name: 'CreationPost',
    data() {
        return {
            text: '',
            file_name: '',
            displayPopup: false
        }
    },
    methods: {
        send() {
            let payload = {
                text: this.text,
                file_name: this.file_name
            }
            http.post('/posts/', payload)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
    }
}
</script>

<style scoped lang="scss">
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
    background: none; 
    border: none;    
    position: absolute;
    top: 0;
    right: 0;
}
</style>