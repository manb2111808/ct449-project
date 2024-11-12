<template>
<div class="page">
        <h2 class="text-center">Mượn sách</h2>
        <div class="regulation border border-dark border-5 mt-3 mb-4">
            <strong class="h4 ">Quy định mượn trả sách:</strong>
            <ul class="regulation-body list-unstyled mt-2">
                <li class="ml-5">- Tên người mượn phải chính xác và có sự đồng ý từ người đó. Nếu vi phạm sẽ bị xử phạt tùy trường hợp.</li>
                <li class="ml-5">- Mỗi lần chỉ mượn được tối đa không quá 5 cuốn sách. Trường hợp mượn quá quy định, phải đưa ra lý do phù hợp.</li>
                <li class="ml-5">- Thời hạn mượn mỗi cuốn sách là 14 ngày, kể từ ngày mượn. Vượt quá ngày quy định sẽ phải đóng tiền phạt.</li>
                <li class="ml-5">- Không được tự ý sao chép, buôn sách sách trái phép. Nếu vi phạm sẽ bị xử lý hành chính hoặc hình sự tùy mức độ nghiêm trọng.</li>
            </ul>
        </div>
        <BookBorrowForm :bookDetailId="bookDetailId" :bookName="bookName" @submit:bookBorrow="borrowBook"/>
        {{ message }}
    </div>
</template>
<script>
import bookDetailService from "@/services/bookDetail.service";
import BookBorrowForm from "../components/BorrowForm.vue";

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
            await bookDetailService.borrow(data.bookDetailId, data.username);
            this.$router.push({path: '/'});
        }
    }
}
</script>

<style scoped>
    .regulation {
        padding: 2rem;
    }
    .regulation-body{
        font-size: 18px;
    }
</style>