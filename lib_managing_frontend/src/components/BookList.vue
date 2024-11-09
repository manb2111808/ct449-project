<template>
    <div class="BookSearch-Container" v-for="(book, index) in books" :key="book._id" >
        <div class="BookSearchCard">
            <div class="detail-left">
                <div class="img-container">
                    <img :src="book.imageURL" alt="Book image">
                </div>
            </div>
            <div class="detail-right">
                <dl>
                    
                    <p class="mt-2">Tên sách: {{ book.name }}</p>
                        <!-- <dd class="detailField">Tên sách:</dd>
                        <dd class="detailValue">{{ book.name }} -->
                            <!-- <box-icon @click="addDetail(book._id)" id="add" color="green" size="28px" animation="tada-hover" type="solid" name="book-add"></box-icon> -->
                        <!-- </dd> -->
                    <p>Đơn giá: {{ book.price }}</p>
                    <p>Tác giả: {{ book.authorName }}</p>
                    <p>Nhà xuất bản: {{ book.publisherName }}</p>
                    <p>Địa chỉ nhà xuất bản: {{ book.publisherAddress }}</p>
                    <p>Năm xuất bản: {{ book.publishYear }}</p>
                </dl>
                Edit Button
                <router-link :to="{ name: 'library.edit', params: { id: book._id } }">
                    <button>Chỉnh sửa <box-icon id="edit" color="#ffb703" size="20px" name="edit" type="solid"></box-icon></button>
                </router-link> 
                <!-- Table for book details -->
                <table class="table table-striped">
                    <thead>
                        <tr>
                           <th>Số lần mượn</th>
                            <th>Trạng thái</th>
                            <th>Cho mượn</th>
                            <th>Trả sách</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(detail, idx) in book.details" :key="detail._id">
                            <th>{{ detail.borrowCount }}</th>
                            <th>
                                <box-icon :color="detail.available ? 'green' : 'red'" type="solid" name="circle"></box-icon>
                            </th>
                            <th v-if="detail.available">
                                <box-icon @click="borrowBook(detail._id, book.name)" id="borrow" color="#00b4d8" type="solid" name="book"></box-icon>
                            </th>
                            <th v-else></th>
                            <th v-if="!detail.available">
                                <box-icon @click="returnBorrow(detail._id)" id="return" color="#f77f00" type="solid" name="book"></box-icon>
                            </th>
                            <th v-else></th>
                        </tr>
                    </tbody>
                </table>

                
            </div>
        </div>
    </div>
</template>

<script>
import "boxicons";
import BookService from "@/services/book.service";
import bookDetailService from "@/services/bookDetail.service";

export default {
    props: {
        books: { type: Array, default: () => [] }
    },
    methods: {
        async addDetail(id) {
            try {
                await BookService.addDetail(id);
                this.$router.go();
                alert("Thêm sách thành công!");
            } catch (error) {
                alert("Lỗi thêm sách!");
                console.error(error);
            }
        },
        async deleteDetail(id) {
            try {
                await bookDetailService.deleteDetail(id);
                this.$router.go();
                alert("Xóa sách thành công!");
            } catch (error) {
                alert("Lỗi xóa sách!");
                console.error(error);
            }
        },
        borrowBook(borrowId, bookName) {
            this.$router.push({
                name: "library.borrow",
                query: { BorrowId: borrowId, BookName: bookName }
            });
        },
        async returnBorrow(id) {
            await bookDetailService.return(id);
            this.$router.go();
            alert("Đã hoàn tất trả sách!");
        }
    }
};
</script>

<style scoped>
.BookSearch-Container {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ddd;
    display: flex;
}

.BookSearchCard {
    display: flex;
    background-color: #fff;
    width: 100%;
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
    width: 100%;
    height: auto;
}

.detail-right {
    width: 100%;
    padding-left: 20px;
}

.table {
    width: 100%;
    margin-top: 20px;
}
</style>
