<template>
    <div id="app">
        <header class="header">
            <nav id="nav" class="d-flex justify-content-between align-items-center p-2 py-4 p-sm-4">
                <h1>
                    <router-link to="/feed">
                        <img src="./assets/icon-white.svg" alt="Logo Groupomania" width="100%" height="40px" />
                    </router-link>
                </h1>
                <NavBar />
            </nav>
        </header>
        <router-view class="view" />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import { mapState } from "vuex";

export default {
    components: {
        NavBar
    },

    mounted() {
        this.check()
    },

    computed: {
        ...mapState(['loggedUser'])
    },

    methods: {
        check() {            
            if (this.loggedUser.id == 0) {
                if (localStorage.getItem('vuex')) {
                    localStorage.removeItem('vuex');
                }

                if (this.$router.currentRoute.path !== '/' || this.$router.currentRoute.path !== '/signup') {
                    this.$router.push('/');
                }                
            }
        }
    }    
}
</script>

<style lang="scss">
#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

a {
    cursor: pointer;
    color: #2c3e50!important;

    &:hover {
        text-decoration: none!important;    
    }
}

.header {
    background-color: #303030;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

.view {
    padding-top: 100px;
}

.button_bg {
    background-color: transparent;
}

.btn:focus {
    box-shadow: unset!important;
}

.username:hover {
    text-decoration: underline!important;
}
</style>
