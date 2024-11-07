<template>
    <nav class="navbar navbar-light bg-dark justify-content-between">
        <LogNav />
    </nav>

    <nav class="navbar navbar-expand navbar-light bg-warning">
        <router-link class="navbar-brand" to="/library">Thư viện điện tử</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="btn" to="/library">Trang chủ</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn" to="/introduction">Giới thiệu</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn" to="/DataChart">Thống kê</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn" to="/addBook">Thêm sách</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn" to="/borrowList">Sách đang mượn</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
// import LogNav from "@/components/LogNav.vue";
import { RouterLink } from 'vue-router';
import router from "../router";

export default {
    components: {
    // LogNav,
    RouterLink,
    router,
    },
}

</script>

<style>
.log-container {
    padding-right: 15px;
}
</style>