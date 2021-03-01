<template>
    <div class="mt-5">               
        <div class="popup justify-content-center align-items-center" v-if="popup">
            <div class="popup__container p-4 shadow">
                <button class="btn_close p-2" @click="displayPopup(); definePost()">
                    <b-icon icon="x-circle" font-scale="1.5"></b-icon>
                </button>
                <h3><span v-if="postId">Modifier ce post</span><span v-else>Créer un nouveau post</span></h3><hr>
                <div class="text-left">
                    <p>
                        <b-avatar :src="loggedUser.avatarUrl" size="3rem"></b-avatar>
                        <span class="ml-3">{{ loggedUser.username }}</span>
                    </p>
                </div>
                <form @submit.prevent="send">
                    <div class="form-group">
                        <!--<label>Contenu du post</label><br>-->
                        <textarea class="form-control border-light" name="text_post" rows="2" cols="50" placeholder="Que voulez vous dire?" v-model="text"></textarea>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="m-0">Ajouter à votre post :</p>
                            <div>
                                <a class="mr-3" @click="addFile = !addFile; addLink = false"><b-icon icon="images" variant="success" font-scale="1.5"></b-icon></a>
                                <a @click="addLink = !addLink; addFile = false"><b-icon icon="youtube" variant="danger" font-scale="1.5"></b-icon></a>
                                <!--<a @click="addLink = !addLink; addFile = false"><b-icon icon="link" variant="info" font-scale="1.5"></b-icon></a>-->
                            </div>
                        </div>
                        <div class="form-group d-block" v-if="addFile">    
                            <label for="file">Image / Vidéo</label><br>
                            <div class="mt-1 mb-3" v-if="filePreview">
                                <img :src="filePreview" height="100" v-if="file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'" />
                                <iframe :src="filePreview" v-else></iframe>    
                            </div>        
                            <input type="file" name="file" accept="image/png, image/gif, image/jpeg, image/jpg video/mp4, video/quicktime, application/pdf" @change="onFileUpload">
                        </div>
                        <div class="form-group" v-if="addLink">    
                            <label for="file">Ajouter un lien Youtube</label><br>                                   
                            <textarea class="form-control border-light" name="url" placeholder="Url" rows="1" @change="getUrl"></textarea>
                            <div class="mt-2 mb-3" v-if="link">
                                <iframe :src="link"></iframe>    
                            </div>               
                        </div>
                    </div>
                    <button type="submit" class="bg-dark text-white rounded-pill mt-3 px-4 py-2">Envoyer</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
    name: 'FormPost',
    data() {
        return {
            text: '',
            file: null,
            link: null,
            filePreview: '',
            addFile: false,
            addLink: false,
            post: null
        }
    },
    updated() {
        if (this.postId) {
            http.get(`/posts/${this.postId}`)
            .then(response => {
                let post = response.data;

                this.text = post.text;
                if (post.file_url) {
                    this.file = post.file_url
                    this.addFile = true
                }
                if (post.link_url) {
                    this.link = post.link_url
                    this.addLink = true
                }
            })
            .catch(error => console.log(error));
        }
    },
    computed: {
        ...mapState([ 'loggedUser', 'popup', 'postId' ])        
    },
    methods: {
        ...mapMutations(['definePost']),

        ...mapActions([ 'displayPopup' ]),
        
        getEmbedUrl(url) {
            let ytId = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
            ytId = ytId || url.match(/youtube\.com.*(\?|&)v=([a-zA-Z0-9_-]+)/);

            return ytId
                ? "https://www.youtube.com/embed/" + ytId.pop()
                : url;
        },

        getUrl(event) {
            let url = event.target.value;

            this.link = this.getEmbedUrl(url);
        },

        onFileUpload(event) {
            this.file = event.target.files[0];
            this.createImage(this.file);
        },

        createImage(file) {
            let reader = new FileReader();

            reader.onload = () => {
                this.filePreview = reader.result;
            };
            reader.readAsDataURL(file);
        },

        send() {
            let post = {
                text: this.text,
                link_url: this.link,
                user_id: this.loggedUser.id
            }
            
            if (this.file) {
                const formData = new FormData();
                formData.append('user', JSON.stringify(post));
                formData.append('file', this.file, this.file.name);

                if (this.postId) {
                    http.put(`/posts/${this.postId}`, formData)
                    .then(this.displayPopup)
                    .catch(error => console.log(error));
                } else {
                    http.post('/posts/', formData)
                    .then(response => {
                        console.log(response.data)
                        this.displayPopup
                    })
                    .catch(error => console.log(error));
                }
            } else {
                if (this.postId) {
                    http.put(`/posts/${this.postId}`, post)
                    .then(response => {
                        console.log(response.data)
                        this.displayPopup
                    } )
                    .catch(error => console.log(error));
                } else {
                    http.post('/posts/', post)
                    .then(response => {
                        this.$emit("added", response.data.post)
                        this.displayPopup
                    })
                    .catch(error => console.log(error));
                }
            }            
        }
    }
}
</script>

<style lang="scss">
.popup {
    display: flex;
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;   
    z-index: 2;
    background: rgba(150, 150, 150, 0.5);
    &__container {
        background-color: #FFFFFF;
        border: 8px solid white;
        border-radius: 8px;
        position: relative;
        min-width: 30%;
        max-width: 100%;
        min-height: 25%;
        max-height: 60%;
    }
}

.btn_close {
    color: #2c3e50!important;
    background: none; 
    border: none;    
    position: absolute;
    top: 0;
    right: 0;
}
</style>