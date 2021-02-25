<template>
  <div class="signup container my-5">
    <h1>Inscription</h1>
    <form method="get" class="mx-auto m-3 mt-5 w-50">        
        <div class="form-group my-3">    
            <label for="lastName">Nom</label><br>        
            <input class="form-control rounded" type="text" name="lastName" v-model="last_name" required>
        </div>
        <div class="form-group my-3">    
            <label for="firstName">Prénom</label><br>        
            <input class="form-control rounded" type="text" name="firstName" v-model="first_name" required>
        </div>
        <div class="form-group my-3">    
            <label for="username">Nom d'utilisateur</label><br>        
            <input class="form-control rounded" type="text" name="username" v-model="username" required>
        </div>
        <div class="form-group my-3">
            <label for="email">Adresse mail</label><br>
            <input class="form-control rounded" type="email" name="email" v-model="email" required >
        </div>
        <div class="form-group my-3">
            <label for="password">Mot de passe</label><br>
            <input class="form-control rounded" type="password" name="password" aria-describedby="passwordHelp" v-model="password" required>
            <small id="passwordHelp" class="form-text text-muted">Doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial.</small>
        </div>
        <div class="form-group my-3">    
            <label for="avatar">Image de profil</label><br>        
            <input type="file" name="avatar" accept="image/png, image/jpg, image/jpeg">
        </div>
    </form>
    <button class="bg-dark text-white rounded-pill m-4 px-4 py-2" @click="signup">Inscription</button>
  </div>
</template>

<script>
import http from '@/http';

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
            .catch(error => console.log(error));
        }  
    }
}
</script>