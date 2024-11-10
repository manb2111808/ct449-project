<template>
    <div class="BookSearch-Container" v-for="(book, index) in books" :key="book._id">
        <div class="BookSearchCard">
            <div>
                <!-- Detailed View -->
                <div class="BookSearchDetail-Container">
                    <div class="detail-left">
                        <div class="img-container">
                            <img v-bind:src="book.imageURL" alt="Detail book image">
                        </div>
                    </div>
                    <div class="detail-right">
                        <dl>
                            <div class="">
                                <p class="mt-2">Tên sách: {{ book.name }}</p> 
                                
                            </div>
                            <p>Đơn giá: {{ book.price }}</p>
                            <p>Tác giả: {{ book.authorName }}</p>
                            <p>Nhà xuất bản: {{ book.publisherName }}</p>
                            <p>Địa chỉ nhà xuất bản: {{ book.publisherAddress }}</p>
                            <p>Năm xuất bản: {{ book.publishYear }}</p>
                            <router-link :to="{ name: 'library.edit', params: { id: book._id } }">
                                <button>Chỉnh sửa <box-icon id="edit" color="#ffb703" size="20px" name='edit' type='solid'></box-icon></button>
                            </router-link>
                        </dl>
                    </div>

                    <box-icon id="add" @click="addDetail(book._id)" color="green" size="28px" animation='tada-hover' type='solid' name='book-add'></box-icon>
                    
                    <div id="detail-Area">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>TT</th>
                                    <th>Mã</th>
                                    <th>Số lần mượn</th>
                                    <th>Trạng thái</th>
                                    <th>Cho mượn</th>
                                    <th>Trả sách</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <!-- <tr v-for="(i, index) in details" :key="i._id"> -->
                                <tr v-for="(detail, idx) in bookDetails(book._id)" :key="detail._id">
                                    <!-- <th>{{ index + 1 }}</th>
                                    <th>{{ details[index]._id }}</th>
                                    <th>{{ details[index].borrowCount }}</th>
                                    <th v-if="details[index].available"><box-icon color="green" type='solid' name='circle'></box-icon></th>
                                    <th v-else><box-icon color="red" type='solid' name='circle'></box-icon></th>
                                    <th v-if="details[index].available">
                                        <box-icon @click="borrowBook(details[index]._id, book.name)" id="borrow" color="#00b4d8" type='solid' name='book'></box-icon>
                                    </th>
                                    <th v-else></th>
                                    <th v-if="!details[index].available">
                                        <box-icon @click="returnBorrow(details[index]._id)" id="borrow" color="#f77f00" type='solid' name='book'></box-icon>
                                    </th>
                                    <th v-else></th>
                                    <th><box-icon id="remove" @click="deleteDetail(details[index]._id)" color="#D62828" type='solid' name='folder-minus'></box-icon></th> -->
                                    <th>{{ idx + 1 }}</th>
                                    <th>{{ detail._id }}</th>
                                    <th>{{ detail.borrowCount }}</th>
                                    <th v-if="detail.available"><box-icon color="green" type='solid' name='circle'></box-icon></th>
                                    <th v-else><box-icon color="red" type='solid' name='circle'></box-icon></th>
                                    <th v-if="detail.available">
                                        <box-icon @click="borrowBook(detail._id, book.name)" id="borrow" color="#00b4d8" type='solid' name='book'></box-icon>
                                    </th>
                                    <th v-else></th>
                                    <th v-if="!detail.available">
                                        <box-icon @click="returnBorrow(detail._id)" id="borrow" color="#f77f00" type='solid' name='book'></box-icon>
                                    </th>
                                    <th v-else></th>
                                    <th><box-icon id="remove" @click="deleteDetail(detail._id, book._id)" color="#D62828" type='solid' name='folder-minus'></box-icon></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "boxicons";
import { RouterLink } from "vue-router";
import BookService from "@/services/book.service";
import bookDetailService from "@/services/bookDetail.service";

export default {
    props: {
        books: { type: Array, default: [] },
    },
    data() {
        return {
            details: [],
            bookDetailsMap: {},
        };
    },
    components: {
        RouterLink,
    },
    methods: {
        onClickButton() {
            this.$emit('clicked', '');
        },

        async addDetail(bookId) {
            // try {
            //     const newDetail = await BookService.addDetail(bookId);
            //     this.$set(this.bookDetailsMap, bookId, [...(this.bookDetailsMap[bookId] || []), newDetail]); 
            //     alert("Thêm sách thành công!");
                
            // } catch (error) {
            //         alert("Lỗi thêm sách!");
            //     console.error(error);
            // }

            try {
                // Attempt to add the new detail for the book
                console.log("Attempting to add new book detail...");
                const newDetail = await BookService.addDetail(bookId);
                
                // If the API call is successful, update the book details
                if (!this.bookDetailsMap[bookId]) {
                    this.bookDetailsMap[bookId] = [];
                }
                this.bookDetailsMap[bookId].push(newDetail);
                
                // Display the success message
                alert("Thêm sách thành công!");

                // Refresh the page or re-fetch details to update the view
                this.$router.go(); // This forces a reload of the current route
                
            } catch (error) {
                // If something goes wrong, display an error message
                alert("Lỗi thêm sách!");
                console.error(error);
            }
        },

        async getDetailsForBook(bookId) {
            if (!this.bookDetailsMap[bookId]) {
                this.bookDetailsMap[bookId] = await bookDetailService.getDetail(bookId);
            }
            return this.bookDetailsMap[bookId];
        },

        async deleteDetail(detailId, bookId) {
            try {
                await bookDetailService.deleteDetail(detailId);
                this.bookDetailsMap[bookId] = this.bookDetailsMap[bookId].filter(detail => detail._id !== detailId);
                alert("Xóa sách thành công!");
            } catch (error) {
                alert("Lỗi xóa sách!");
                console.error(error);
            }
        },

        borrowBook(borrowId, bookName) {
            this.$router.push({
                name: "library.borrow",
                query: {
                    BorrowId: borrowId,
                    BookName: bookName,
                }
            });
        },

        async returnBorrow(detailId) {
            await bookDetailService.return(detailId);
            this.$router.go();
            alert("Đã hoàn tất trả sách!");
        },

        bookDetails(bookId) {
            return this.bookDetailsMap[bookId] || [];
        }
    },

    created() {
        this.books.forEach(book => {
            // Load details for each book once the component is created
            this.getDetailsForBook(book._id);
        });
    }
};
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

.detail-left {
    padding-right: 15px;
}

.detail-left .img-container {
    overflow: hidden;
    height: 180px;
    width: 120px;
}

.detail-left img {
    width: 100px;
    display: block;
    top: 25%;
    left: 25%;
}

.detail-left,
.detail-right {
    display: table-cell;
    vertical-align: top;
}

.detail-right {
    font-size: 14px;
    width: 10000px;
}

.BookSearchDetail-Container,
.detail-right {
    zoom: 1;
    overflow: hidden;
}

.detailField {
    width: 30%;
    display: inline-flex;
}

.detailValue {
    width: 200%;
}

thead tr th {
    vertical-align: middle;
}

button#summary {
    margin-right: 20px;
}

box-icon#add {
    float: right;
}

box-icon#edit {
    vertical-align: -4px;
}

box-icon#remove {
}
</style>
