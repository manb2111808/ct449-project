<template>
<div class="page">
        <h4>Mượn sách</h4>
        <BookBorrowForm :bookDetailId="bookDetailId" :bookName="bookName" @submit:bookBorrow="borrowBook"/>
        {{ message }}
    </div>
</template>
<script>
import bookDetailService from "@/services/bookDetail.service";
import BookBorrowForm from "../components/BookBorrowForm.vue";

export default {
    components: {
        BookBorrowForm,
    },
    data(){
        return{
            message: "",
            bookDetailId: this.$route.query.BorrowId ? this.$route.query.BorrowId : "",
            bookName: this.$route.query.BookName ? this.$route.query.BookName : "",
        }
    },

    methods: {
        async borrowBook(data){
            await bookDetailService.borrow(data.borrow_id, data.username);
            alert("Đã đăng ký mượn thành công!");
            this.message = "Đăng ký mượn thành công!";
            this.$router.push({path: '/library'});
        }
    }
}
</script>