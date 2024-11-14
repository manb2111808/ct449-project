<template>
  <div class="book-list">
    <div class="book-item mt-3" v-for="(book, index) in books" :key="book._id">
      <!-- Image Section -->
       <h3 class="book-title">{{ book.name }}</h3>
      <div class="row  ">
      <!-- Book Details Section -->
      <div class="book-info col-md-7">
        <p><strong>Tác giả:</strong> {{ book.authorName }}</p>
        <p><strong>Giá mượn:</strong> {{ book.price }}</p>
        <p><strong>Nhà xuất bản:</strong> {{ book.publisherName }}</p>
        <p><strong>Địa chỉ nhà xuất bản:</strong> {{ book.publisherAddress }}</p>
        <p><strong>Năm xuất bản:</strong> {{ book.publishYear }}</p>
        <!-- Edit Button -->
        <router-link :to="{ name: 'library.edit', params: { id: book._id } }" class="btn btn-warning mt-2 ml-5">
          Chỉnh sửa
        </router-link>
      </div>
      <div class="book-image col-md-5">
            <img :src="book.imageURL" alt="Book Image"/>
        </div>

        
      </div>

      <!-- Book Details Table -->
      <div class="book-details border border-2 border-dark">
        <button @click="addDetail(book._id)" class="add-detail-button">Thêm một bản</button>
        <table class="details-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Số lần mượn</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, idx) in bookDetails(book._id)" :key="detail._id">
              <td>{{ idx + 1 }}</td>
              <td>{{ detail._id }}</td>
              <td>{{ detail.borrowCount }}</td>
              <td>
                <span v-if="detail.available" class="status available">Đang có</span>
                <span v-else class="status not-available">Đang Mượn</span>
              </td>
              <td>
                <span v-if="!detail.available"></span>
                <span v-else @click="deleteDetail(detail._id, book._id)" class="delete-action">Xóa</span>
              </td>
            </tr>
          </tbody>
        </table>
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

.book-item {
  background-color: #c5edf3;
  border-radius: 8px;
  padding-left:2rem;
  padding-right:2rem;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-image img {
  border-radius: 5px;
  margin-top: 1rem;
  width: 15rem;
  height: 15rem;
}

.book-info {
  margin-top: 1rem;
}

.book-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  color: #2b2d42;
}

.book-info p {
  margin: 0.2rem 0;
  color: #495057;
  font-size: 20px;
  padding-left: 3rem;
}

.edit-button:hover {
  background-color: #2c6cd1;
}

.book-details {
  margin-top: 1rem;
  padding: 1rem;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.details-table th,
.details-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.status {
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-weight: bold;
}

.available {
  color: green;
}

.not-available {
  color: red;
}

.add-detail-button {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.4rem 0.8rem;
  background-color: #38b000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.add-detail-button:hover {
  background-color: #2d8c00;
}

.delete-action {
  color: #e63946;
  cursor: pointer;
}

.delete-action:hover {
  text-decoration: underline;
}
</style>