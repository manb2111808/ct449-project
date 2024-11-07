import { createWebHistory, createRouter } from "vue-router";

import Library from "@/views/Library.vue"

const routes = [

    //Trang thư viện
    {
        path: "/",
        name: "library",
        component: Library,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;