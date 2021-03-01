<template>
  <div class="signup container my-5">
    <h1>Inscription</h1>
    <form class="mx-auto m-3 mt-5 w-50" @submit.prevent="signup">        
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
            <div class="d-flex justify-content-around align-items-center">                        
                <div class="mt-2 mb-3" v-if="imagePreview">
                    <b-avatar :src="imagePreview" size="6rem"></b-avatar>    
                </div> 
                <input type="file" name="avatar" accept="image/png, image/jpg, image/jpeg " @change="onFileUpload">  
            </div> 
        </div>
        <button type="submit" class="bg-dark text-white rounded-pill m-4 px-4 py-2">Inscription</button>
    </form>
    
  </div>
</template>

<script>
import http from '@/http';
import { mapMutations } from "vuex";

export default {
    name: 'Signup',
    data() {
        return {
            last_name: '',
            first_name: '',
            username: '',
            email: '',
            password: '',
            file: null,
            imagePreview: ''
        }
    }, 
    methods: {  
         ...mapMutations([
            'initUser'
        ]),

        onFileUpload(event) {
            this.file = event.target.files[0];
            this.createImage(this.file);
        },

        createImage(file) {
            let reader = new FileReader();

            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        },

        signup() {  
            const user = {
                last_name: this.last_name,
                first_name: this.first_name,
                username: this.username,
                email: this.email,
                password: this.password
            };  

            const formData = new FormData();
            formData.append('user', JSON.stringify(user));
            formData.append('file', this.file, this.file.name);
              
            http.post('/users/signup', formData)
            .then(() => {
                http.post('/users/login', user)
                .then(response => {
                    this.initUser(response.data)
                    sessionStorage.setItem('token', response.data.token)
                    this.$router.push('/feed')
                })
                .catch(error => {
                    sessionStorage.removeItem('token');
                    console.log(error)
                });
            })
            .catch(error => console.log(error));
        }  
    }
}
</script>