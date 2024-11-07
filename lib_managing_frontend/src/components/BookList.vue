<template>
    <div
        class="BookSearch-Container"
        v-for="(book, index) in books"
    >
        <div class="BookSearchCard">
            <div v-if="ActiveIndex != index">
                <p>Tên sách: {{ book.name }}</p>
                <p>Đơn giá: {{ book.price }}</p>
                <p>Tác giả: {{ book.authorName }}</p>
                <p>Nhà xuất bản: {{ book.publisherName }}</p>
                <p>Địa chỉ nhà xuất bản: {{ book.publisherAdd }}</p>
                <p>Năm xuất bản: {{ book.publishedYear }}</p>
                <button @click="ActiveIndex = index">Chi tiết</button>
            </div>
            <div v-else>
                <BookSearchDetail @clicked="ActiveIndex = -1" :book="book"/>
            </div>
        </div>
    </div>
</template>

<script>
import BookSearchDetail from './BookSearchDetail.vue';
export default {
    props: {
        books: {type: Array, default: []},
        ActiveIndex: { type: Number, default: -1},
    },
    components: {
        BookSearchDetail,
    },
}
</script>

<style scoped>
.BookSearch-Container {
    margin: 20px 0px;
    padding: 15px 10px;
    border: 1px solid #ddd;
}

.BookSearchCard {
    background-color: #ffffff;
}
</style>
