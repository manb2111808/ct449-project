<template>
    <div class="Log-Group" v-if="!checkLogin">
        <div class="float-right">
            <!-- <router-link to="/register" class="btn btn-outline-primary btn-sm">Đăng ký</router-link> -->
        </div>
    </div>
    <div v-else>
        <p id="display-user"> <box-icon color="white" type='solid'></box-icon> <span>{{ localStaff.username}}</span></p>
        <a href="/"><button id="logOut" type="button" class="btn btn-outline-danger btn-sm" @click="logOut"><span>Đăng xuất</span> <box-icon color="#dc3545" name='door-open' type='solid' ></box-icon></button></a>
    </div>
</template>

<script>
import "boxicons";
import $ from 'jquery';
import StaffsService from "@/services/staff.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import router from '../router';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        $
    },

    data() {
        const SignInSchema = yup.object().shape({
            username: yup.string().required("Username không được trống.")
                .max(50, "Username có nhiều nhất 50 ký tự"),

            password: yup.string().required("Mật khẩu không được trống.")
                .max(50, "Mật khẩu không được quá 50 ký tự"),

            confirm_password: yup.string().required("Nhập lại mật khẩu không được trống.")
                .max(50, "Nhập lại mật khẩu không được quá 50 ký tự")
                .when("password", (password, field) => password ? field.required().oneOf([yup.ref('password')], "Không đúng mật khẩu") : field),
            
            address: yup.string().required("Địa chỉ không được trống.")
                .max(200, "Địa chỉ không được vượt quá 200 ký tự.")
                .min(6, "Địa chỉ quá ngắn"),
            
            phone: yup.string().required("Số điện thoại không được để trống."),

            role: yup.string().required("Chức vụ không được để trống.")
                .max(50, "Chức vụ quá dài."),
        });

        return {
            checkLogin: localStorage.getItem("user") != "" ? true : false,
            localStaff: localStorage.getItem("user"),   
            staff: [],
            staffLogin: [],
            staffSignIn: [],
            staffs: [],
            localStaff: (JSON.parse(localStorage.getItem("user"))),
            LogStatus: false,
            SignInSchema,
        }
    },

    watch:{
    },

    methods: {

        // Đăng xuất
        logOut(){
            this.LogStatus = false;
            localStorage.removeItem("user");
            this.localStaff = [];
            this.checkLogin = false;
            router.push('/');
        },

        //Đăng ký
        async SignUpStaff(){
            try{
                await StaffsService.create(this.staffSignIn);
                alert("Đăng ký thành công!")
            } catch (error){
                alert("Lỗi xảy ra khi đăng ký");
            }
        },


        // Lấy danh sách các tài khoản
        async retrieveStaffs() {
            try {
                this.staffs = await StaffsService.getAll();
                
            } catch (error) {
                console.error();
            }
        },
    },

    // Tự cập nhật danh sách tài khoản khi load trang
    mounted() {
        this.retrieveStaffs();
        
    },
}
</script>

<style scoped>
#display-user {
    display: inline-block;
    position: relative;
    top: 8px;
    left: 8px;
    line-height: 20px;
    font-size: 20px;
    color: white;
}

p#display-user span{
    font-size: 18px;
    vertical-align: 7px;
    font-weight: 700;

}

p#display-user box-icon{
    margin-right: 2px;
}

button#logOut{
    margin-left: 30px;
}

button#logOut span{
    vertical-align: 4px;
    font-weight: 700;
}

button#logOut box-icon{
    vertical-align: -2px;
}
</style>