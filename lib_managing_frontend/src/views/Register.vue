<template>
  <div class="signup-container">
    <div class="form-card">
      <div class="form-header">
        <h2>Đăng ký tài khoản</h2>
      </div>
      <Form @submit="submitStaff" :validation-schema="SignInSchema">
        <div class="form-body">
          <div class="input-group">
            <label for="username">Tên đăng nhập:</label>
            <Field
              name="username"
              id="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              class="input-field"
              v-model="staffSignIn.username"
            />
            <ErrorMessage name="username" class="error-message" />
          </div>

          <div class="input-group">
            <label for="password">Mật khẩu:</label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              class="input-field"
              v-model="staffSignIn.password"
            />
            <ErrorMessage name="password" class="error-message" />
          </div>

          <div class="input-group">
            <label for="confirm_password">Nhập lại mật khẩu:</label>
            <Field
              name="confirm_password"
              id="confirm_password"
              type="password"
              placeholder="Xác nhận mật khẩu"
              class="input-field"
            />
            <ErrorMessage name="confirm_password" class="error-message" />
          </div>

          <div class="input-group">
            <label for="address">Địa chỉ:</label>
            <Field
              name="address"
              id="address"
              type="text"
              placeholder="Nhập địa chỉ"
              class="input-field"
              v-model="staffSignIn.address"
            />
            <ErrorMessage name="address" class="error-message" />
          </div>

          <div class="input-group">
            <label for="phone">Số điện thoại:</label>
            <Field
              name="phone"
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              class="input-field"
              v-model="staffSignIn.phone"
            />
            <ErrorMessage name="phone" class="error-message" />
          </div>

          <div class="input-group">
            <label for="role">Chức vụ:</label>
            <Field
              name="role"
              id="role"
              as="select"
              class="input-field"
              v-model="staffSignIn.role"
            >
              <option value="">Chọn chức vụ</option>
              <option value="staff">Nhân viên</option>
              <option value="manager">Quản lý</option>
              <option value="more">Khác</option>
            </Field>
            <ErrorMessage name="role" class="error-message" />
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn btn-submit">Đăng ký</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import StaffsService from "@/services/staff.service.js";
import router from '../router';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const SignInSchema = yup.object().shape({
      username: yup.string().required("Username không được trống.").max(50, "Username có nhiều nhất 50 ký tự"),
      password: yup.string().required("Mật khẩu không được trống.").max(50, "Mật khẩu không được quá 50 ký tự"),
      confirm_password: yup
        .string()
        .required("Nhập lại mật khẩu không được trống.")
        .oneOf([yup.ref("password")], "Không đúng mật khẩu"),
      address: yup.string().required("Địa chỉ không được trống.").max(200, "Địa chỉ không được vượt quá 200 ký tự."),
      phone: yup.string().required("Số điện thoại không được để trống."),
      role: yup.string().required("Chức vụ không được để trống.").max(50, "Chức vụ quá dài."),
    });

    return {
      SignInSchema,
      staffSignIn: {
        username: "",
        password: "",
        address: "",
        phone: "",
        role: "",
      },
    };
  },
  methods: {
    async submitStaff() {
      try {
        await StaffsService.create(this.staffSignIn);
        alert("Đăng ký thành công!");
        router.push("/");
      } catch (error) {
        alert("Lỗi xảy ra khi đăng ký");
      }
    },
    goBack() {
      router.push("/");
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: #f7f7f7; */
}

.form-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 400px;
  width: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-header h2 {
  margin: 0;
  color: #333;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.input-field {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #5c8aff;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
}

.form-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit {
  background-color: #5c8aff;
  color: #fff;
}

.btn-submit:hover {
  background-color: #4b6fc3;
}

.btn-cancel {
  background-color: #ddd;
}

.btn-cancel:hover {
  background-color: #bbb;
}
</style>
