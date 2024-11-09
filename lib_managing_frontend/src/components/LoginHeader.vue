<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand text-light" to="/">
        <img src="@/assets/img/library.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" style="background-color: aliceblue;"> Thư viện trực tuyến
      </router-link>
    </div>
  </nav>
</template>

<script>
import LogNav from "@/components/LogNav.vue";

export default {
  name: 'LoginHeader',
  LogNav,
}
</script>

<style scoped>
.navbar {
  background-color: rgb(0, 81, 255);
}
</style>
