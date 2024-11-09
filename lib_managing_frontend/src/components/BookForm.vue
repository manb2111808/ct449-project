<template>
    <Form
        @submit="submitBook"
        :validation-schema="bookFormSchema"
    >
        <div class="form-group">

            <label for="name">Tên sách:</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="book.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author-name">Tên tác giả:</label>
            <Field
                name="author-name"
                type="text"
                class="form-control"
                v-model="book.authorName"
            />
            <ErrorMessage name="author-name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisherName">Tên nhà xuất bản:</label>
            <Field
                name="publisherName"
                type="text"
                class="form-control"
                v-model="book.publisherName"
            />
            <ErrorMessage name="publisherName" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisherAddress">Địa chỉ nhà xuất bản:</label>
            <Field
                name="publisherAddress"
                type="text"
                class="form-control"
                v-model="book.publisherAddress"
            />
            <ErrorMessage name="publisherAddress" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Đơn giá:</label>
            <Field
                name="price"
                type="text"
                class="form-control"
                v-model="book.price"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publishYear">Năm xuất bản:</label>
            <Field
                name="publishYear"
                type="text"
                class="form-control"
                v-model="book.publishYear"
            />
            <ErrorMessage name="publishYear" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image-url">Ảnh sách:</label>
            <Field
                name="image-url"
                type="text"
                class="form-control"
                v-model="book.imageURL"
            />
            <ErrorMessage name="image-url" class="error-feedback" />
        </div>
        <div class="form-group">
            <button id="submit" class="btn btn-success">Lưu <box-icon color="white" name='save' ></box-icon></button>
            <button
                id="delete"
                v-if="book._id"
                type="button"
                class="btn btn-danger"
                @click="deleteBook"
            >
                Xóa <box-icon name='folder-minus' color="white" ></box-icon>
            </button>
        </div>
    </Form>
</template>

<script>
import "boxicons";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from '@/services/publisher.service';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ["submit:book", "delete:book"],

    props: {
        book: {type: Object, required: true }
    },

    data() {
        const bookFormSchema = yup.object().shape({
            'name': yup
                .string()
                .required("Thiếu tên sách.")
                .min(2,'Tên phải có ít nhất 2 ký tự.')
                .max(100,'Tên có tối đa 100 ký tự.'),
            'author-name': yup
                .string()
                .required("Thiếu tên tác giả")
                .max(100,'Tên tác giả có tối đa 100 ký tự'),
            'publisherName': yup
                .string()
                .required('Thiếu tên NXB')
                .max(100,'Tên NXB có tối đa 100 ký tự'),
            'publisherAddress': yup
                .string()
                .required('Thiếu địa chỉ NXB')
                .max(100,'Địa chỉ NXB có tối đa 100 ký tự'),
            'price': yup
                .number()
                .required('Thiếu đơn giá')
                .min(0, 'Đơn giá không âm')
                .max(1000000, 'Đơn giá tối đa 1.000.000'),
            'image-url': yup
                .string()
                .required('Thiếu đường link ảnh'),
        });

        return {
            bookLocalInfo: this.book,
            bookFormSchema,
        }
    },

    methods:{
        async submitBook() {
            try {
                // Check if publisher name and address are provided
                if (this.book.publisherName && this.book.publisherAddress) {
                    // Create a new publisher if not already in the system
                    const publisherData = {
                        name: this.book.publisherName,
                        address: this.book.publisherAddress,
                    };

                    await publisherService.add(publisherData);  // Add the publisher
                    console.log('New Publisher added:', publisherData); // For debugging
                }

                // After publisher is added, submit the book data
                this.$emit('submit:book', this.book);
            } catch (error) {
                console.error('Error adding publisher or book:', error);
            }
        },

        // submitBook() {
        //     this.$emit('submit:book', this.book);
        // },

        deleteBook() {
            this.$emit('delete:book', this.book._id);
        }
    },

    created(){
        this.bookLocalInfo = this.book;
    }

}
</script>

<style scoped>
    button#submit{
        margin-right: 20px;
    }

    #submit box-icon, #delete box-icon {
        vertical-align: -4px;
        margin-left: 2px;
    }
</style>
