<template>
  <div class="Log-Group" v-if="!LogStatus">
    <!-- Login Button -->
    <div class="float-right">
      <button type="button" class="btn btn-primary btn-sm" @click="showLoginModal = true">
        Đăng nhập
      </button>
    </div>
    <!-- Signup Button -->
    <div class="float-right">
      <button type="button" class="btn btn-primary btn-sm" @click="showSignupModal = true">
        Đăng ký
      </button>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal-wrapper">
      <div class="modal-backdrop" @click="showLoginModal = false"></div>
      <div class="modal-content" @click.stop>
        <Form @submit="submitUser" :validation-schema="LogInSchema">
          <div class="modal-header">
            <h5 class="modal-title">Đăng nhập</h5>
            <button type="button" class="close" @click="showLoginModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="username">Tên đăng nhập:</label>
              <Field name="username" id="username" type="text" class="form-control" v-model="userLogin.username" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="password">Mật khẩu:</label>
              <Field name="password" id="password" type="password" class="form-control" v-model="userLogin.password" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showLoginModal = false">Đóng</button>
            <button type="submit" class="btn btn-primary">Đăng nhập</button>
          </div>
        </Form>
      </div>
    </div>

    <!-- Signup Modal -->
    <div v-if="showSignupModal" class="modal-wrapper">
      <div class="modal-backdrop" @click="showSignupModal = false"></div>
      <div class="modal-content" @click.stop>
        <Form @submit="SignUpUser" :validation-schema="SignInSchema">
          <div class="modal-header">
            <h5 class="modal-title">Đăng ký</h5>
            <button type="button" class="close" @click="showSignupModal = false">&times;</button>
          </div>
          <div class="modal-body">
                <div class="form-group">
                            <label for="fullname">Họ tên:</label>
                            <Field name="fullname" id="fullname" type="text" class="form-control" v-model="userSignIn.fullname" />
                            <ErrorMessage name="fullname" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="username">Tên đăng nhập:</label>
                            <Field name="username" id="username" type="text" class="form-control" v-model="userSignIn.username" />
                            <ErrorMessage name="username" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="password">Mật khẩu:</label>
                            <Field name="password" id="password" type="password" class="form-control" v-model="userSignIn.password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Nhập lại mật khẩu:</label>
                            <Field name="confirm_password" id="confirm_password" type="password" class="form-control" v-model="userSignIn.confirm_password" />
                            <ErrorMessage name="confirm_password" class="error-feedback" />
                        </div>
                        <!-- Additional Fields -->
                        <div class="form-group">
                            <label for="address">Địa chỉ:</label>
                            <Field name="address" id="address" type="text" class="form-control" v-model="userSignIn.address" />
                            <ErrorMessage name="address" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="phone">Số điện thoại:</label>
                            <Field name="phone" id="phone" type="tel" class="form-control" v-model="userSignIn.phone" />
                            <ErrorMessage name="phone" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="birthday">Ngày sinh:</label>
                            <Field name="birthday" id="birthday" type="date" class="form-control" v-model="userSignIn.birthday" />
                            <ErrorMessage name="birthday" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="phai">Giới tính:</label>
                            <Field as="select" name="phai" id="phai" class="form-control" v-model="userSignIn.phai">
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </Field>
                            <ErrorMessage name="phai" class="error-feedback" />
                        </div>
                    </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showSignupModal = false">Đóng</button>
            <button type="submit" class="btn btn-primary">Đăng ký</button>
          </div>
        </Form>
      </div>
    </div>
  </div>

  <!-- User Info (Logged In) -->
  <div v-else>
    <p class="text-white" id="display-user">{{ localUser.username }}</p>
    <button type="button" class="btn btn-danger btn-sm" @click="logOut">Đăng xuất</button>
  </div>
</template>

<script>
import UsersService from "@/services/user.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: { Form, Field, ErrorMessage },

  data() {
    return {
      userLogin: {},
      userSignIn: {},
      localUser: JSON.parse(localStorage.getItem("user")) || {},
      LogStatus: !!localStorage.getItem("user"),
      showLoginModal: false,
      showSignupModal: false,
      LogInSchema: yup.object({
        username: yup.string().required("Username không được trống.").max(50),
        password: yup.string().required("Mật khẩu không được trống.").max(50),
      }),
      SignInSchema: yup.object({
        fullname: yup.string().required("Họ và tên không được trống.").max(20),
        username: yup.string().required("Username không được trống.").max(50),
        password: yup.string().required("Mật khẩu không được trống.").max(50),
        confirm_password: yup
          .string()
          .oneOf([yup.ref("password")], "Mật khẩu không khớp")
          .required("Nhập lại mật khẩu"),
        address: yup.string().required("Địa chỉ không được trống."),
        phone: yup.string().required("Số điện thoại không được để trống."),
        birthday: yup.date().required("Vui lòng chọn ngày sinh."),
        phai: yup.string().required("Phái không được để trống.")
      }),
    };
  },
  methods: {
    async submitUser() {
      try {
        this.user = await UsersService.login(this.userLogin.username, this.userLogin.password);
        
        if (this.user) {
          // If user is returned, login is successful
          alert("Đăng nhập thành công");

          // Set local user and update login status
          this.LogStatus = true;
          localStorage.setItem("user", JSON.stringify(this.user));

          // Update localUser and hide the login modal
          this.localUser = this.user;
          this.showLoginModal = false;
          this.$router.go();
        } else {
          // If no user is returned, login failed
          alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
      } catch (error) {
        console.error("Đăng nhập thất bại", error);
        alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
      }
    },

    async SignUpUser() {
        try {
            console.log("Signup Data:", this.userSignIn); // Debugging log
            await UsersService.create(this.userSignIn); // Assume this is your API call
            alert("Đăng ký thành công");

            this.showSignupModal = false; //Close Singup modal
            this.showLoginModal = true; //Open Login modal
            // setTimeout(() => {
                
            // }, 1500);
        } catch (error) {
            console.error("Đăng ký thất bại", error);
            alert("Lỗi xảy ra khi đăng ký!");
        }
    },

    logOut() {
      this.LogStatus = false;
      localStorage.removeItem("user");
      this.localUser = {};
      this.$router.go();
    },

    async retrieveContacts() {
            try {
                this.contacts = await ContactsService.getAll();
                // console.log(this.contacts);
            } catch (error) {
                console.error();
            }
        },
  },

  mounted() {
        this.retrieveContacts();
    },
};
</script>

<style scoped>
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  overflow: hidden;
}

.modal-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1060;
  max-height: 80vh; /* Adjust the max-height */
  overflow-y: auto; /* Make it scrollable */
  width: 60%; /* Adjust width as needed */
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%; /* For smaller screens */
    max-height: 70vh;
  }
}
</style>