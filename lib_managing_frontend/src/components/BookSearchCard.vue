<template>
    <div class="input-group">
        <InputSearch v-model="searchedBook"/>
    </div>
    <button class="mt-4"><router-link class="btn" to="/addBook">Thêm sách</router-link></button>
    <div class="SearchItems-Group">
        <BookList
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
            v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sách nào.</p>
    </div>
</template>

<script>
import BooksService from '@/services/book.service.js';
import BookList from '@/components/BookList.vue';
import InputSearch from './InputSearch.vue';
export default {
    data() {
        return {
            books: [],
            searchedBook: "",
            activeIndex: -1,
        }
    },

    components: {
        BookList,
        InputSearch,
    },

    methods: {

        async retrieveBooks() {
            try {
                this.books = await BooksService.getAll(); //Lấy tất cả sách
            } catch (error) {
                console.error();
            }
        },

        refreshList() {
            this.retrieveBooks(); //Gọi lại retrieveBooks để refresh lại trang
        },
    },

    mounted() {
        this.refreshList();
    },

    computed: {
        bookString() {
            return this.books.map((book) => {
                const { name, price, authorName, publishInfo, publishYear } = book;
                return [name, price, authorName, publishInfo, publishYear].join(""); //tạo một string các thông tin của book để cho bên filterBooks
            });
        },


        filteredBooks() {
            if (!this.searchedBook) return this.books;
            return this.books.filter((_book, index) => //filter giúp lọc mảng books
                this.bookString[index].includes(this.searchedBook) //string.includes(str) giúp tìm chuỗi với case sensitive
            );
        },

        //Check số book hiển thị
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
}
</script>
