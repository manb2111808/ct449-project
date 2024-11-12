import { createWebHistory, createRouter } from "vue-router";

import Library from "@/views/Library.vue"
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import AddBook from '@/views/BookAdd.vue';
import Borrowed from '@/views/BookBorrowed.vue';

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

    // //Trang đăng ký
    {
        path: "/register",
        name: "library.register",
        component: Register,
    },

    //Trang thêm sách
    {
        path: "/addBook",
        name: "library.add",
        component: AddBook,
    },

    //Trang chỉnh sửa thông tin sách
    {
        path: "/editBook/:id",
        name: "library.edit",
        component: () => import('../views/BookEdit.vue'),
        props: true
    },
    //Trang danh sách đang được mượn
    {
        path: "/bookBorrowed",
        name: "library.bookBorrowed",
        component: Borrowed, 
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;