<template>
  <div class="borrow-container">
    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Borrow Cards -->
    <div v-else class="borrow-cards">
      <div v-for="(borrow, index) in borrows" :key="index" class="borrow-card">
        <div class="card-header">
          <h3>{{ getBookName(borrow.book_id) }}</h3>
          <p class="mt-3">Mã số sách: {{ borrow._id }}</p>
        </div>
        <div class="card-body">
          <div class="card-row">
            <span class="card-field">Tên tài khoản:</span>
            <span class="card-value">{{ borrow.username }}</span>
          </div>
          <div class="card-row">
            <span class="card-field">Trạng thái:</span>
            <strong class="card-value status">Đang mượn</strong>
          </div>
        </div>
      </div>
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
/* Loading Spinner Styles */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #5c8aff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Container and Card Styles */
.borrow-container {
  padding: 20px;
  background-color: #f7f7f9;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.borrow-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
}

.borrow-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.borrow-card:hover {
  transform: translateY(-5px);
}

.card-header {
  background-color: #5c8aff;
  color: #ffffff;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.card-header p {
  margin: 0;
  font-size: 0.9rem;
}

.card-body {
  padding: 15px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-field {
  font-weight: 600;
  color: #555;
}

.card-value {
  color: #333;
}

.status {
  color: #ed221f; /* Green color for status */
}

@media (max-width: 768px) {
  .borrow-cards {
    max-width: 100%;
  }
}
</style>