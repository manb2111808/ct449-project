<script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
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
      <AppHeader/>
    </header>
    <div class="container">
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
  margin-bottom: 20px;
}

footer {
  padding-top: 20px;
  margin-top: 20px;
  background-color: #F2E9E4;
}
</style>