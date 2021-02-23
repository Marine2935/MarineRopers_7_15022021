<template>
  <div class="login">
    <h1>Connexion</h1>
    <form method="get">
        <div>    
            <label for="username">Nom d'utilisateur</label><br>        
            <input type="text" name="username" v-model="username" required>
        </div>
        <div>
            <label for="password">Mot de passe</label><br>
            <input type="password" name="password" v-model="password" required>
        </div>
    </form>
    <button @click="login">Connexion</button>
  </div>
</template>

<script>
import http from '@/http';

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {  
            let payload = {
                username: this.username,
                password: this.password
            }    
            http.post('/users/login', payload)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }  
    }
}
</script>