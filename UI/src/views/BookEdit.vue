<template>
    <div class="page">
        <h4>Chỉnh sửa thông tin sách</h4>
        <bookForm 
            :book="book" 
            @submit:book="updateBook" 
            @delete:book="deleteBook" 
        />
        {{ message }}
    </div>
</template>

<script>
import bookForm from '@/components/BookForm.vue';
import bookService from '@/services/book.service.js';

export default {
    components: {
        bookForm,
    },

    props: {
        id: { type: String, required: true }
    },

    data() {
        return {
            book: {
            },
            message: "",
        };
    },

    methods: {
        // Lấy thông tin sách thông qua id 
        async getBook(id){
            try{
                
                this.book = await bookService.get(id);
            }catch(error){
                console.log(error);
                this.message = 'Lỗi tìm sách';
            }
        },

        //Cập nhật sách
        async updateBook(data) {
            try {
                await bookService.update(this.book._id, data);
                this.message = 'Cập nhật sách thành công';
            } catch (error) {
                console.log(error);
                this.message = 'Lỗi cập nhật';
            }
        },

        async deleteBook(id){
            try {
                await bookService.delete(id);
                this.message = 'Xóa sách thành công';
            } catch (error) {
                console.log(error);
                this.message = 'Lỗi xóa sách';
            }
        }
    },

    created(){
        this.getBook(this.id);
        this.message='';
    },
}
</script>