<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div class="borrowBox" v-for="(borrow, index) in borrows" :key="index">
      <dl>
        <dd></dd>
        <dd class="detailField">Tên sách:</dd>
        <dd class="detailValue">{{ getBookName(borrow.book_id) }} </dd>
        <dd></dd>
        <dd class="detailField">Mã số sách:</dd>
        <dd class="detailValue">{{ borrow._id }} </dd>
        <dd></dd>
        <dd class="detailField">Số lần mượn:</dd>
        <dd class="detailValue">{{ borrow.borrowCount }}</dd>
        <dd></dd>
        <dd class="detailField">Tên tài khoản:</dd>
        <dd class="detailValue">{{ borrow.username }}</dd>
        <dd></dd>
        <dd class="detailField">Trạng thái:</dd>
        <dd class="detailValue">Đang mượn</dd>
        <dd></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import bookService from "@/services/book.service";
export default {
    props: {
        borrows: { type: Array, default: [] },
    },

    data() {
        return {
        books: [],
        loading: true, // Add loading state
        };
    },

    async created() {
        await this.fetchBooks();
        this.loading = false;
    },

    methods: {
        async fetchBooks() {
            try {
                const response = await bookService.getAll();
                if (Array.isArray(response)) {
                this.books = response;
                } else if (response && response.data) {
                this.books = response.data;
                } else {
                this.books = [];
                }
                console.log("Fetched books:", this.books);
            } catch (error) {
                console.error("Error fetching books:", error);
                this.books = [];
            }
        },

        getBookName(bookId) {
            if (!Array.isArray(this.books) || this.books.length === 0) {
                return "Unknown";
            }
            const book = this.books.find(book => book._id === bookId);
            return book ? book.name : "Unknown";
        },
    },
};
</script>


<style scoped>

.borrowBox{ 
    border-radius: 30px;
    padding-top: 20px;
    padding-left: 30px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    
    background-color: #F2E9E4;
}
.detailField {
    width: 30%;
    display: inline-flex;
    font-weight: 700;
}

.detailValue {
    width: 70%;
    display: inline;
}

.detailField, .detailValue {
    align-content: center;
}
</style>