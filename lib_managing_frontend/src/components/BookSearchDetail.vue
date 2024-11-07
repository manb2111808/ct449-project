<template>
    <div class="BookSearchDetail-Container">
        <div class="detail-left">
            <div class="img-container">
                <img v-bind:src="book.imageURL" alt="Detail book image">
            </div>
        </div>
        <div class="detail-right">
            <dl>
                <dd></dd>
                <dd class="detailField">Tên sách:</dd>
                <dd class="detailValue">{{ book.name }} <box-icon id="add" @click="addDetail(book._id)" color="green" size="28px"
                        animation='tada-hover' type='solid' name='book-add'></box-icon></dd>
                <dd></dd>
                <dd class="detailField">Đơn giá:</dd>
                <dd class="detailValue">{{ book.price }}</dd>
                <dd></dd>
                <dd class="detailField">Tác giả:</dd>
                <dd class="detailValue">{{ book.authorName }}</dd>
                <dd></dd>
                <dd class="detailField">Nhà xuất bản:</dd>
                <dd class="detailValue">{{ book.publisherName }}</dd>
                <dd></dd>
                <dd class="detailField">Địa chỉ nhà xuất bản:</dd>
                <dd class="detailValue">{{ book.publisherAdd }}</dd>
                <dd></dd>
                <dd class="detailField">Năm xuất bản:</dd>
                <dd class="detailValue">{{ book.publishedYear }}</dd>
                <!-- <dd></dd>
                <dd class="detailField">Mã số kệ sách</dd>
                <dd class="detailValue">{{ book.position }}</dd>
                <dd></dd>
                <dd class="detailField">Thể loại</dd>
                <dd class="detailValue">{{ book.genre }}</dd> -->
            </dl>
        </div>
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
                    <tr v-for="(i, index) in details">
                        <th>{{ index + 1 }}</th>
                        <th>{{ details[index]._id }}</th>
                        <th>{{ details[index].borrowCount }}</th>
                        <th v-if="details[index].available"><box-icon color="green" type='solid' name='circle'></box-icon></th>
                        <th v-else><box-icon color="red" type='solid' name='circle'></box-icon></th>
                        <th v-if="details[index].available">
                            <box-icon @click="borrowBook(details[index]._id, book.name)"  id="borrow" color="#00b4d8" type='solid' name='book'></box-icon>
                        </th>
                        <th v-else></th>
                        <th v-if="!details[index].available">
                                <box-icon @click="returnBorrow(details[index]._id)"  id="borrow" color="#f77f00" type='solid' name='book'></box-icon>
                        </th>
                        <th v-else></th>
                        <th><box-icon id="remove" @click="deleteDetail(details[index]._id)" color="#D62828" type='solid' name='folder-minus'></box-icon>
                        </th>
                    </tr>
                </tbody>
            </table>
            <div id="detail-Field"></div>
            <div class="detail-Value"></div>
        </div>
        <button id="summary" @click="onClickButton()">Tổng quan</button>
        <router-link :to="{
            name: 'library.edit',
            params: { id: book._id }
        }">
            <button>Chỉnh sửa <box-icon id="edit" color="#ffb703" size="20px" name='edit' type='solid' ></box-icon></button>

        </router-link>
    </div>
</template>

<script>
import "boxicons";
import { RouterLink } from "vue-router";

import BookService from "@/services/book.service";
import bookDetailService from "@/services/bookDetail.service";

export default {
    data() {
        return {
            details: [],
        }
    },
    components: {
        RouterLink,
    },

    props: {
        book: { type: Object, required: true }
    },

    methods: {
        onClickButton(event) {
            this.$emit('clicked', '');
        },

        async addDetail(id) {
            console.log(id);
            try {
                await BookService.addDetail(id);
                this.$router.go();
                alert("Thêm sách thành công!");
            } catch (error) {
                alert("Lỗi thêm sách!");
                console.error(error);
            }
        },

        async getDetail(id) {
            this.details = await bookDetailService.getDetail(id);
        },

        async deleteDetail(id) {
            try {
                await bookDetailService.deleteDetail(id);
                this.$router.go();
                alert("Xóa sách thành công!");
            } catch (error) {
                alert("Lỗi thêm sách!");
                console.error(error);
            }
        },

        borrowBook(borrowId, bookName){
            this.$router.push({
                name: "library.borrow",
                query: {
                    BorrowId: borrowId,
                    BookName: bookName,
                }
            })
        },

        async returnBorrow(id){
            await bookDetailService.return(id);
            this.$router.go();
            alert("Đã hoàn tất trả sách!");
        }
    },

    created() {
        this.getDetail(this.book._id);
    },
}
</script>

<style scoped>
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

.detail-right .dd {
    float: left;
    white-space: pre-line;
}

.detailField {
    width: 30%;
    display: inline-flex;
}

.detailValue {
    width: 70%;
    display: inline;
}

/* Table */
thead tr th{
    vertical-align: middle;
}

button#summary{
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
