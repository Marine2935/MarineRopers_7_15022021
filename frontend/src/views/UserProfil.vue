<template>
    <div class="container mt-5" v-if="user">
        <h1>Mon profil</h1>
        <section class="my-5">
            <h2>Mes informations personnelles</h2><hr>
            <div class="my-5">
                <p>Nom d'utilisateur : {{ user.username }}</p>
                <p>Nom: {{ user.last_name }}</p>
                <p>Prénom: {{ user.first_name }}</p>
                <p>Adresse mail : {{user.email }}</p>
                <p>Image de profil :</p>
                <form class="my-3" @submit.prevent="updateProfil"> 
                    <div class="d-flex justify-content-center form-group">
                        <b-avatar class="ml-3" :src="loggedUser.avatarUrl" size="4rem" v-if="!imagePreview"></b-avatar>                    
                        <b-avatar :src="imagePreview" size="4rem" v-if="imagePreview"></b-avatar>
                        <label class="align-self-end ml-2 mb-0 custom_label" for="avatar" aria-label="Modification de l'avatar"><b-icon icon="pencil-square"></b-icon></label>     
                        <input class="custom_input" type="file" name="avatar" id="avatar" accept="image/png, image/jpg, image/jpeg " @change="onFileUpload">
                    </div>
                    <button class="bg-dark text-white rounded-pill px-4 py-1" type="submit" v-if="imagePreview">Confirmer</button>
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
            imagePreview: ''
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
            const user = {loggedUser: this.loggedUser}
            const formData = new FormData();
            
            formData.append('file', this.file, this.file.name);
            formData.append('user', JSON.stringify(user));

            http.put(`/users/${this.loggedUser.id}`, formData)
            .then(() => {
                this.loggedUser.avatarUrl = this.imagePreview;
                this.imagePreview = null;
            })
            .catch(error => console.log(error));
        }
    }
}
</script>

<style lang="scss">
.custom_input {
    display: none;
}

.custom_label {
    cursor: pointer;
}
</style>