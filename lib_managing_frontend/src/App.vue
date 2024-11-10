<script>
  import AppHeader from "@/components/AppHeader.vue";
  import LoginHeader from "@/components/LoginHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  export default {
    data(){
      return{
        checkLogin: localStorage.getItem("user") ? true : false,
      }
    },
    computed: {
      isLoginPage() {
        return this.$route.name === 'library.login'; // Check if the current route is the login page
      },

       isRegisterPage() {
        return this.$route.name === 'library.register'; // Check if the current route is the register page
      }
    },
    components: {
      AppHeader,
      LoginHeader,
      AppFooter,
    },
  };

</script>

<template>
  <div id="app">
    <header>
      <!-- Render the appropriate header based on the page and login status -->
      <AppHeader v-if="checkLogin" />
      <LoginHeader v-if="!checkLogin && (isLoginPage || isRegisterPage)" />
    </header>
    <div class="container mt-3">
      <router-view />
    </div>
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped>
.container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
<style>
header {
  padding-bottom: 50px;
  margin-top: 20px;
  background-color: #F2E9E4;
}

footer {
  padding-top: 20px;
  margin-top: 20px;
  background-color: #F2E9E4;
}
</style>