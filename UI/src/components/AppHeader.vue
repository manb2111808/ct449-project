<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand text-light" to="/library">
                <img src="@/assets/img/library.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" style="background-color: aliceblue;"> Thư viện trực tuyến
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="col-lg-6">
                    <ul class="navbar-nav"> 
                        <li class="nav-item border border-dark">
                            <router-link class="btn" to="/library">Trang chủ</router-link>
                        </li>
                        <li class="nav-item border border-dark">
                            <router-link class="btn" to="/borrowList">Sách đang mượn</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="float-right"><LogNav /></div>
        </div>
    </nav>
</template>

<script>
import LogNav from "@/components/LogNav.vue";
import { RouterLink } from 'vue-router';
import router from "../router";

export default {
    components: {
    LogNav,
    RouterLink,
    router,
    },
}

</script>

<style>
.log-container {
    padding-right: 15px;
}

.navbar {
    background-color: rgb(0, 81, 255);
    height: 5rem;
}
.nav-item{
    background-color: rgb(127, 195, 255);
}
.nav-link{
    color: black;
}
</style>