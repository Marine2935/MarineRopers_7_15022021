<template>
    <div id="app">
        <header class="header">
            <nav id="nav">
                <router-link to="/"><img src="./assets/icon-white.svg" alt="Logo Groupomania" class="logo_header" /></router-link>
                <div>
                    <router-link to="/signup">Inscription</router-link> |
                    <router-link to="/login">Connexion</router-link>
                </div>
            </nav>
        </header>
        <router-view/>
    </div>
</template>

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

#nav {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        font-weight: bold;
        color: #FFF;

        &.router-link-exact-active {
          color: #42b983;
        }
    }
}
</style>
