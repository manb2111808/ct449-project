<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Danh sách người dùng</h2>

    <!-- Loading Spinner -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- User Cards -->
    <div v-else>
      <div v-if="users.length === 0" class="text-center text-muted">
        <p>Không có người dùng nào</p>
      </div>
      <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="(user, index) in users" :key="index" class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column align-items-center">
              <!-- Avatar Placeholder -->
              <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3" style="width: 70px; height: 70px; font-size: 1.5rem;">
                {{ user.fullname.charAt(0).toUpperCase() }}
              </div>
              <h5 class="card-title">{{ user.fullname }}</h5>
              <p class="text-muted">@{{ user.username }}</p>
              <ul class="list-group list-group-flush w-100">
                <li class="list-group-item">
                  <strong>Địa chỉ:</strong> {{ user.address || 'N/A' }}
                </li>
                <li class="list-group-item">
                  <strong>Số điện thoại:</strong> {{ user.phone || 'N/A' }}
                </li>
                <li class="list-group-item">
                  <strong>Ngày sinh:</strong> {{ formatDate(user.birthday) }}
                </li>
                <li class="list-group-item">
                  <strong>Giới tính:</strong> {{ user.phai }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      users: [],
      loading: true,
    };
  },

  methods: {
    // Fetch all users from the backend
    async fetchUsers() {
      try {
        const response = await UserService.getAll();
        this.users = response; // Assuming response is an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false;
      }
    },

    // Format the date to display in a human-readable format
    formatDate(date) {
      if (!date) return 'N/A';
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>