import { createWebHistory, createRouter } from "vue-router";

import Library from "@/views/Library.vue"
import BookBorrow from '@/views/Borrow.vue';

const routes = [
    // Trang thư viện
    {
        path: "/",
        name: "library",
        component: Library,
    },

    //Trang mượn sách
    {
        path: "/borrow",
        name: "library.borrow",
        component: BookBorrow,
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;