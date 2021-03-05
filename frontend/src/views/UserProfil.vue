<template>
    <div class="container mt-5" v-if="user">
        <h1 class="pb-4">Mon profil</h1>
        <section class="my-5">
            <h2>Mes informations personnelles</h2><hr>
            <div class="my-5">
                <p>Nom d'utilisateur : {{ user.username }}</p>
                <p>Nom: {{ user.last_name }}</p>
                <p>Prénom: {{ user.first_name }}</p>
                <p>Adresse mail : {{user.email }}</p>
                <p>Image de profil :</p>
                <div class="d-flex justify-content-center" v-if="!imagePreview || !displayModify"> 
                        <b-avatar class="ml-3" :src="loggedUser.avatarUrl" size="4rem"></b-avatar>
                        <button class="border-0 text-dark button_bg align-self-end p-0" @click="displayModify = !displayModify"><b-icon icon="pencil-square"></b-icon></button>
                </div>
                <form class="justify-content-center my-3" v-if="displayModify" @submit.prevent="updateProfil">                    
                    <div class="d-flex justify-content-around align-items-center ml-3" v-if="imagePreview">                        
                        <div class="mb-3">
                            <b-avatar :src="imagePreview" size="6rem"></b-avatar>
                        </div> 
                    </div> 
                    <input type="file" name="avatar" accept="image/png, image/jpg, image/jpeg " @change="onFileUpload"><br>
                    <button class="bg-dark text-white rounded-pill px-4 py-1 mt-3" type="submit" v-if="imagePreview">Confirmer </button>
                </form>
            </div>
        </section>
        <section>
            <h2>Informations diverses</h2><hr>
            <div class="my-5">
                <p>Nombre de posts : {{ user.posts_count }}</p>
                <p>Nombre commentaires : {{ user.comments_count }}</p>
                <p>Nombre de likes : {{ user.likes_count }}</p>
                <p>Nombre de dislikes : {{ user.dislikes_count }}</p>
            </div>
        </section>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";

export default {
    name: 'UserProfil',
    data() {
        return {
            user: null, 
            file: null,
            imagePreview: '',
            displayModify: false
        }
    },
    computed: {
        ...mapState(['loggedUser'])
    },
    created() {
        http.get(`/users/${this.loggedUser.id}`)
        .then(response => this.user = response.data)
        .catch(error => console.log(error));
    },
    methods: {
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
        updateProfil() {
            const formData = new FormData();
            formData.append('file', this.file, this.file.name);
            formData.append('user', JSON.stringify(this.loggedUser));

            http.put(`/users/${this.loggedUser.id}`, formData)
            .then(() => {
                this.loggedUser.avatarUrl = this.imagePreview;
                this.displayModify = false;
            })
            .catch(error => console.log(error));
        }
    }
}
</script>

<style lang="scss">
</style>