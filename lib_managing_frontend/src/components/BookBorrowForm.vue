<template>
    <Form
        @submit="submitBorrow"
        :validation-schema="bookBorrowFormSchema"    
    >
        <div class="form-group">
            
            <label for="bookDetail_id">Mã sách:</label>
            <Field
            :disabled =true
                name="bookDetail_id"
                type="text"
                class="form-control"
                v-model="bookLocalDetailId"
            />
            <ErrorMessage name="bookDetail_id" class="error-feedback" />
        </div>
        <div class="form-group">
            
            <label for="name">Tên sách:</label>
            <Field
                :disabled =true
                name="name"
                type="text"
                class="form-control"
                v-model="bookLocalName"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="username">Tên tài khoản người mượn:</label>
            <Field
                name="username"
                type="text"
                class="form-control"
                v-model="username"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup"
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ["submit:bookBorrow"],

    props: {
        bookDetailId: {type: String, required: true },
        bookName: {type: String, required: true }
    },

    data() {
        const bookBorrowFormSchema = yup.object().shape({
            'username': yup
                .string()
                .required('Thiếu tên tài khoản người mượn')
                .max(100,'Tên tài khoản người mượn có tối đa 100 ký tự'),
        });

        return {
            bookLocalDetailId: this.bookDetailId,
            bookLocalName: this.bookName,
            username: "",
            bookBorrowFormSchema,
        }
    },

    methods: {
        submitBorrow() {
            this.$emit('submit:bookBorrow',{
                borrow_id: this.bookLocalDetailId,
                username: this.username,
            });
        },
    }
}
</script>