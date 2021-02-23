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

export default {
    components: {
        NavBar
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

.header {
    background-color: #303030;
}

.logo_header {
    height: 40px;
}

#nav a {
    font-weight: bold;
    color: #FFF;

    &.router-link-exact-active {
        color: #42b983;
    }
}
</style>
