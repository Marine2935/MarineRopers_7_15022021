<template>
    <div id="app">
        <header class="header">
            <nav id="nav" class="d-flex justify-content-between align-items-center p-4">
                <router-link to="/feed"><img src="./assets/icon-white.svg" alt="Logo Groupomania" class="logo_header" /></router-link>
                <NavBar />
            </nav>
        </header>
        <router-view/>
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
    methods: {
        check() {            
            if (this.loggedUser.id == 0) {
                if (sessionStorage.getItem('token')) {
                    sessionStorage.removeItem('token')
                }
                if (this.$router.currentRoute.path !== '/' || this.$router.currentRoute.path !== '/signup') {
                    this.$router.push('/')
                }
                
            }
        }
    },
    computed: {
        ...mapState(['loggedUser'])
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
}

.logo_header {
    height: 40px;
}

.btn:focus {
    box-shadow: unset!important;
}
</style>
