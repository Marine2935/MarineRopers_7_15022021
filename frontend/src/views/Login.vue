<template>
    <div class="login container my-5">
        <h2>Connexion</h2>
        <form class="mx-auto mt-5 mb-3 w-50" @submit.prevent="login">
            <div class="form-group my-3">    
                <label for="username">Nom d'utilisateur</label><br>        
                <b-form-input class="form-control rounded" type="text" name="username" ref="username" id="username" v-model="username" required></b-form-input>
            </div>
            <div class="form-group my-3">
                <label for="password">Mot de passe</label><br>
                <b-form-input class="form-control rounded" type="password" name="password" ref="password" id="password" v-model="password" required></b-form-input>                
                <p class="text-right pt-2 pr-2"><a class="forgot_pass" @click="alert">Mot de passe oublié ?</a></p>
                <b-form-invalid-feedback id="input-live-feedback">Nom d'utilisateur ou mot de passe incorrect.</b-form-invalid-feedback>                
            </div>    
            <button type="submit" class="bg-dark text-white rounded-pill m-4 px-4 py-2">Connexion</button>            
        </form>  
        <p class="mt-4">Première visite ? <router-link to="/signup" class="font-weight-bold signup">Créez votre compte</router-link> !</p>
    </div>
</template>

<script>
import http from '@/http';
import { mapMutations } from "vuex";

export default {
    name: 'Login',

    data() {
        return {
            username: '',
            password: ''
        }
    },
    
    methods: {
        ...mapMutations(['initUser']),

        alert() {
            return alert('Veuillez prendre contact avec la personne en charge des ressources humaines afin de réinitialiser votre mot de passe.')
        },

        login() {              
            let payload = {
                username: this.username,
                password: this.password
            } 
            
            http.post('/users/login', payload)
            .then(response => {
                this.initUser(response.data)
                this.$router.push('/feed')
            })
            .catch(error => {
                localStorage.removeItem('vuex');
                for (let i in this.$refs) {
                    this.$refs[i].state = false;
                }
                console.log(error);
            });
        } 
    }
}
</script>

<style scoped lang="scss">
.forgot_pass {
    color: #2c3e50;
    font-size: 0.9rem;
    &:hover {
        color: black!important;
    }
}

.signup {
    color: #116E8B !important;

    &:hover {
        color: lighten(#116E8B, 15%)!important;
    }
}
</style>