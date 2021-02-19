<template>
    <div>
        <h1>Créer un nouveau post</h1>
        <form method="get">
            <p>
                <label>Créer un post</label><br>
                <textarea name="text_post" rows="8" cols="50" v-model="text" required></textarea>
            </p>
            <p>    
                <label for="file">Ajouter un fichier</label><br>        
                <input type="file" name="file">
            </p>
        </form>
        <button @click="send">Envoyer</button>
    </div>
</template>

<script>
import http from '../http';

export default {
    name: 'CreationPost',
    date() {
        return {
            text: '',
            file_name: ''
        }
    },
    methods: {
        send() {
            let payload = {
                text: this.text,
                file_name: this.file_name
            }
            http.post('/posts/', payload)
            .then(response => console.log(response))
        }
    }
}
</script>