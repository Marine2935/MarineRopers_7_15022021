<template>
  <div class="signup">
    <h1>Inscription</h1>
    <form method="get">        
        <p>    
            <label for="lastName">Nom</label><br>        
            <input type="text" name="lastName" v-model="last_name" required>
        </p>
        <p>    
            <label for="firstName">Prénom</label><br>        
            <input type="text" name="firstName" v-model="first_name" required>
        </p>
        <p>    
            <label for="username">Nom d'utilisateur</label><br>        
            <input type="text" name="username" v-model="username" required>
        </p>
        <p>
            <label for="email">Adresse mail</label><br>
            <input type="email" name="email" v-model="email" required >
        </p>
        <p>
            <label for="password">Mot de passe</label><br>
            <input type="password" name="password" v-model="password" required>
        </p>
        <p>    
            <label for="avatar">Image de profil</label><br>        
            <input type="file" name="avatar"  accept="image/png, image/jpg, image/jpeg">
        </p>
    </form>
    <button @click="signup">Inscription</button>
  </div>
</template>

<script>
import http from '../http';

export default {
    name: 'Signup',
    data() {
        return {
            last_name: '',
            first_name: '',
            username: '',
            email: '',
            password: ''
        }
    }, 
    methods: {        
        signup() {   
            let payload = {
                last_name: this.last_name,
                first_name: this.first_name,
                username: this.username,
                email: this.email,
                password: this.password
            };   
            http.post('/users/signup', payload)
            .then(response => console.log(response))
        }  
    }
}
</script>