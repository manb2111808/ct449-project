<template>
  <div class="signup-container">
    <div class="modal-content">
      <Form @submit="submitStaff" :validation-schema="SignInSchema">
        <div class="modal-header">
          <h5 class="modal-title">Đăng ký</h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="username">Tên đăng nhập:</label>
            <Field name="username" id="username" type="text" class="form-control" v-model="staffSignIn.username" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="password">Mật khẩu:</label>
            <Field name="password" id="password" type="password" class="form-control" v-model="staffSignIn.password" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="confirm_password">Nhập lại mật khẩu:</label>
            <Field name="confirm_password" id="confirm_password" type="password" class="form-control" />
            <ErrorMessage name="confirm_password" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="address">Địa chỉ:</label>
            <Field name="address" id="address" type="text" class="form-control" v-model="staffSignIn.address" />
            <ErrorMessage name="address" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="phone">Số điện thoại:</label>
            <Field name="phone" id="phone" type="text" class="form-control" v-model="staffSignIn.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="role">Chức vụ:</label>
            <Field name="role" id="role" as="select" class="form-control" v-model="staffSignIn.role">
              <option value="">Chọn chức vụ</option>
              <option value="staff">Nhân viên</option>
              <option value="manager">Quản lý</option>
              <option value="more">Khác</option>
            </Field>
            <ErrorMessage name="role" class="error-feedback" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Đăng ký</button>
          <button type="button" class="btn btn-secondary" @click="goBack">Quay lại</button>
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
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}
.error-feedback {
  color: red;
  font-size: 0.875rem;
}
</style>