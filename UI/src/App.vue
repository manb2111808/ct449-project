<script>
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";
export default {
  
  components: {
    AppHeader,
    AppFooter,
  },
};

</script>

<template>
  <div id="app">
    <header>
      <AppHeader />
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