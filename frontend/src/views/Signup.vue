<template>
    <div class="signup container my-5">
        <h1>Inscription</h1>
        <form class="mx-auto m-3 mt-5 w-50">        
            <div class="form-group my-3">    
                <label for="lastName">Nom</label><br>  
                <b-form-input class="form-control rounded" type="text" name="lastName" ref="lastName" id="lastName" v-model="last_name" required></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">Veuillez renseigner votre nom.</b-form-invalid-feedback>
            </div>
            <div class="form-group my-3">    
                <label for="firstName">Prénom</label><br>       
                <b-form-input class="form-control rounded" type="text" name="firstName" ref="firstName" id="firstName" v-model="first_name" required></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">Veuillez renseigner votre prénom.</b-form-invalid-feedback>
            </div>
            <div class="form-group my-3">    
                <label for="username">Nom d'utilisateur</label><br>   
                <b-form-input class="form-control rounded" type="text" name="username" ref="username" id="username" minlength="3" v-model="username" required></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">Veuillez indiquer un pseudo contenant au moins 3 caractères.</b-form-invalid-feedback>
            </div>
            <div class="form-group my-3">
                <label for="email">Adresse mail</label><br>
                <b-form-input class="form-control rounded" type="email" name="email" ref="email" id="email" v-model="email" required></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">Veuillez renseigner une adresse mail valide.</b-form-invalid-feedback>
            </div>
            <div class="form-group my-3">
                <label for="password">Mot de passe</label><br>
                <b-form-input class="form-control rounded" type="password" name="password" ref="password" id="password" pattern="(?=.*\W)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" v-model="password" required></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">Doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial.</b-form-invalid-feedback>
            </div>
            <div class="form-group my-3">
                <p>Image de profil</p>
                <div class="d-flex justify-content-center mt-2 mb-3">
                    <b-avatar class="ml-3" :src="imagePreview" size="5rem"></b-avatar>
                    <label class="align-self-end m-0 custom_label" for="avatar" aria-label="Modification de l'avatar">
                        <b-icon icon="pencil-square"></b-icon>
                    </label> 
                    <input class="custom_input" type="file" name="avatar" id="avatar" accept="image/png, image/jpg, image/jpeg " @change="onFileUpload">   
                </div>
            </div>
            <button type="submit" class="bg-dark text-white rounded-pill m-3 px-4 py-2" @click="check">Inscription</button>
        </form>  
        <p class="mt-4">Vous avez déjà un compte ? <router-link to="/" class="font-weight-bold login">Connectez-vous</router-link> !</p>  
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
         ...mapMutations(['initUser']),

        createImage(file) {
            let reader = new FileReader();

            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        },

        onFileUpload(event) {
            this.file = event.target.files[0];
            this.createImage(this.file);
        },

        check(e) {  
            e.preventDefault();
            let errors = 0;
            
            for (let i in this.$refs) {
                if (this.$refs[i].checkValidity()) {
                    this.$refs[i].state = true
                } else {
                    this.$refs[i].state = false
                    errors++
                }
            }            
            
            if (errors === 0) {
                this.signup();
            }
        },

        signup() {
            const formData = new FormData();
            const user = {
                last_name: this.last_name,
                first_name: this.first_name,
                username: this.username,
                email: this.email,
                password: this.password
            };

            if (this.file) {
                formData.append('user', JSON.stringify(user));
                formData.append('file', this.file, this.file.name);
            }
            
            const payload = this.file ? (formData) : (user);
              
            http.post('/users/signup', payload)
            .then(() => {
                http.post('/users/login', user)
                .then(response => {
                    this.initUser(response.data);
                    sessionStorage.setItem('token', response.data.token);
                    this.$router.push('/feed');
                })
                .catch(error => {
                    sessionStorage.removeItem('token');
                    console.log(error);
                });
            })
            .catch(error => console.log(error));
        }        
    }
}
</script>

<style scoped lang="scss">
.custom_input {
    display: none;
}

.custom_label {
    cursor: pointer;
}

.form__icon {
    position: absolute;
    top: 35px;
    right: 25px;
    z-index: 1;
}

.login {
    color: #116E8B !important;

    &:hover {
        color: lighten(#116E8B, 15%)!important;
    }
}
</style>