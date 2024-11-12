<template>
  <div>
    <h4><b>Danh sách sách đang mượn</b></h4><br>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Borrow Cards -->
    <div v-else>
      <div v-if="borrows.length === 0">
        <p>Không có sách đang mượn</p>
      </div>
      <div v-else class="borrow-cards">
        <div v-for="(borrow, index) in borrows" :key="index" class="borrow-card">
          <div class="card-header">
            <h3>{{ borrow.bookName }}</h3>
            <p class="mt-3">Mã số sách: {{ borrow._id }}</p>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="card-field">Tên tài khoản:</span>
              <span class="card-value">{{ borrow.username }}</span>
            </div>
            <div class="card-row">
              <span class="card-field">Ngày mượn:</span>
              <span class="card-value">{{ formatDate(borrow.borrowDate) }}</span>
            </div>
            <div class="card-row">
              <span class="card-field">Ngày hết hạn:</span>
              <span class="card-value">{{ formatDate(borrow.dueDate) }}</span>
            </div>
            <div class="card-row">
              <span class="card-field">Trạng thái:</span>
              <strong class="card-value status">Đang mượn</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import borrowCardService from "@/services/borrowCard.service";

export default {
    data() {
        return {
            borrows: [],
            loading: true,
        }
    },
    
    methods: {
        async fetchBorrowCards() {
            try {
                const response = await borrowCardService.getAll();
                this.borrows = response; // assuming response is an array of borrowing card objects
            } catch (error) {
                console.error("Error fetching borrow cards:", error);
            } finally {
                this.loading = false;
            }
        },

        formatDate(date) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString("vi-VN", options);
        },
    },

    mounted() {
        this.fetchBorrowCards();
    }
}
</script>

<style scoped>
.borrow-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.borrow-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.card-header h3 {
  margin: 0;
  color: #333;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.card-field {
  font-weight: bold;
}

.status {
  color: green;
}

.loading-spinner {
  text-align: center;
  margin-top: 20px;
}
</style>