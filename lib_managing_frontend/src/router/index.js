import { createWebHistory, createRouter } from "vue-router";

import Library from "@/views/Library.vue"
import Login from '@/views/Login.vue';

const routes = [

    // Trang đăng nhập
    {
        path: "/",
        name: "library.login",
        component: Login,
    },
    
    // Trang thư viện
    {
        path: "/library",
        name: "library",
        component: Library,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;