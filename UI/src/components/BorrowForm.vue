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
                v-model="bookDetailId"
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
                v-model="bookName"
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
        <!-- New Borrow Date Field -->
        <div class="form-group">
            <label for="borrow_date">Ngày mượn:</label>
            <Field
                name="borrow_date"
                type="date"
                class="form-control"
                v-model="borrowDate"
                @change="updateDueDate"
            />
            <ErrorMessage name="borrow_date" class="error-feedback" />
        </div>
        <!-- New Due Date Field -->
        <div class="form-group">
            <label for="due_date">Ngày trả:</label>
            <Field
                name="due_date"
                type="date"
                class="form-control"
                :value="dueDate"
                disabled
            />
            <ErrorMessage name="due_date" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup"
import { Form, Field, ErrorMessage } from "vee-validate";
import BorrowCardService from "@/services/borrowCard.service";

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

        const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // Add 14 days to current date
        const formattedDueDate = dueDate.toISOString().split('T')[0];

        return {
            bookDetailId: this.bookDetailId,
            bookName: this.bookName,
            username: "",
            borrowDate: currentDate,
            dueDate: formattedDueDate,
            bookBorrowFormSchema,
        }
    },

    methods: {
        async submitBorrow() {
            const borrowData = {
                bookDetailId: this.bookDetailId,
                bookName: this.bookName,
                username: this.username,
                borrowDate: this.borrowDate,
                dueDate: this.dueDate,
            };
            try {
                // Send the form data to the backend via the BorrowCardService
                await BorrowCardService.borrowBook(borrowData);

                // Emit success event and show a success message
                
                this.$emit("submit:bookBorrow", borrowData);
                alert("Sách đã được mượn thành công!");
                this.$router.push('/library');
            } catch (error) {
                console.error("Error saving borrow data:", error);
                alert("Có lỗi xảy ra khi lưu thông tin mượn sách!");
            }
        },
    }
}
</script>