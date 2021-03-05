<template>
  <div class="login container my-5">
    <h1>Connexion</h1>
    <form class="mx-auto mt-5 mb-3 w-50" @submit.prevent="login">
        <div class="form-group my-3">    
            <label for="username">Nom d'utilisateur</label><br>        
            <input class="form-control rounded" type="text" name="username" id="username" v-model="username" required>
        </div>
        <div class="form-group my-3">
            <label for="password">Mot de passe</label><br>
            <input class="form-control rounded" type="password" name="password" id="password" v-model="password" required>
            <p class="text-right pt-2 pr-2"><a class="forgot_pass" @click="alert">Mot de passe oublié ?</a></p>
        </div>    
        <button type="submit" class="bg-dark text-white rounded-pill m-4 px-4 py-2">Connexion</button>            
    </form>  
    <p class="mt-4">Première visite ? <router-link to="/signup" class="font-weight-bold text-info">Créez votre compte</router-link> !</p>
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
                console.log(error)
            });
        },
        alert() {
            return alert('Veuillez prendre contact avec la personne en charge des ressources humaines afin de réinitialiser votre mot de passe.')
        }   
    }
}
</script>

<style lang="scss">
.forgot_pass {
    color: #2c3e50;
    font-size: 0.9rem;
    &:hover {
        color: black;
    }
}
</style>