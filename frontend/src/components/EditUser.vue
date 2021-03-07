<template>
    <div>               
        <div class="popup justify-content-center align-items-center" v-if="popup">
            <div class="popup__container p-4 shadow">
                <button class="btn_close p-2" aria-label="Fermer popup" @click="togglePopup(); defineUserId(null)">
                    <b-icon icon="x-circle" font-scale="1.5"></b-icon>
                </button>
                <h3>Modifier {{ username }}</h3><hr>                
                <form class="mx-auto m-3 mt-5 w-50" @submit.prevent="editUser">        
                    <div class="form-group my-3">    
                        <label for="lastName">Nom</label><br>        
                        <input class="form-control rounded" type="text" name="lastName" id="lastName" v-model="last_name" required>
                    </div>
                    <div class="form-group my-3">    
                        <label for="firstName">Prénom</label><br>        
                        <input class="form-control rounded" type="text" name="firstName" id="firstName" v-model="first_name" required>
                    </div>
                    <div class="form-group my-3">    
                        <label for="username">Nom d'utilisateur</label><br>        
                        <input class="form-control rounded" type="text" name="username" id="username" v-model="username" required>
                    </div>
                    <div class="form-group my-3">
                        <label for="email">Adresse mail</label><br>
                        <input class="form-control rounded" type="email" name="email" id="email" v-model="email" required >
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Mot de passe</label><br>
                        <input class="form-control rounded" type="password" name="password" id="password" placeholder="Mot de passe" aria-describedby="passwordHelp" v-model="password" required>
                        <small id="passwordHelp" class="form-text">Doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial.</small>
                    </div>
                    <button type="submit" class="bg-dark text-white rounded-pill px-4 py-2">Envoyer</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import { mapActions, mapMutations, mapState } from "vuex";

export default {
    name: 'EditUser',
    data() {
        return {
            last_name: '',
            first_name: '',
            username: '',
            email: '',
            password: ''
        }
    },
    updated() {
        if (this.popup && this.first_name === null && this.last_name === null) {
            http.get(`/users/${this.userId}`)
            .then(response => {
                let user = response.data;             

                this.last_name = user.last_name,
                this.first_name = user.first_name,
                this.username = user.username,
                this.email = user.email

            })
            .catch(error => console.log(error));
        } else if (!this.popup) {
            this.last_name = null,
            this.first_name = null,
            this.username = null,
            this.email = null
        }
    },
    computed: {
        ...mapState(['loggedUser', 'popup', 'userId'])        
    },
    methods: {
        ...mapActions(['togglePopup']),

        ...mapMutations(['defineUserId']),

        editUser() {
            const user = {
                last_name: this.last_name,
                first_name: this.first_name,
                username: this.username,
                email: this.email,
                password: this.password,
                loggedUser: this.loggedUser
            };
            
            http.put(`/users/${this.userId}`, user)
            .then(response => {
                this.$emit("edited", response.data)
                this.togglePopup()
            })
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
        max-height: 80%;
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