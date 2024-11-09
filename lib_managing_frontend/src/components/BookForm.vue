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
            <label for="publisher">Tên nhà xuất bản:</label>
            <Field
                name="publisher"
                type="text"
                class="form-control"
                v-model="book.publishInfo"
            />
            <ErrorMessage name="publisher" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publishAddress">Địa chỉ nhà xuất bản:</label>
            <Field
                name="publishAddress"
                type="text"
                class="form-control"
                v-model="book.publishAddress"
            />
            <ErrorMessage name="publishAddress" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publishId">Mã nhà xuất bản:</label>
            <Field
                name="publishId"
                type="text"
                class="form-control"
                v-model="book.publishId"
            />
            <ErrorMessage name="publishId" class="error-feedback" />
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
            <label for="position">Vị trí:</label>
            <Field
                name="position"
                as="select"
                class="form-control"
                v-model="book.position"
            >
                <option value="I5">I5</option>
                <option value="I6">I6</option>
                <option value="I7">I7</option>
                <option value="I8">I8</option>
                <option value="I9">I9</option>
                <option value="J1">J1</option>
                <option value="J2">J2</option>
                <option value="K4">K4</option>
                <option value="K5">K5</option>
                <option value="AA">AA</option>
            </Field>
            <ErrorMessage name="position" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="genre">Thể loại:</label>
            <Field
                name="genre"
                as="select"
                class="form-control"
                v-model="book.genre"
            >
                <option value=""></option>
                <option value="Fantasy">Giả tưởng</option>
                <option value="Scifi">Khoa học viễn tưởng</option>
                <option value="Romance">Tình cảm</option>
                <option value="Horror">Kinh dị</option>
                <option value="Classic">Văn học kinh điển</option>
                <option value="Document">Tài liệu</option>
                <option value="More">Khác</option>
            </Field>
            <ErrorMessage name="genre" class="error-feedback" />
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
            'publisher': yup
                .string()
                .required('Thiếu tên NXB')
                .max(100,'Tên NXB có tối đa 100 ký tự'),
            'publishAddress': yup
                .string()
                .required('Thiếu địa chỉ NXB')
                .max(100,'Địa chỉ NXB có tối đa 100 ký tự'),
            'publishId': yup
                .string()
                .required('Thiếu ID nhà xuất bản')
                .max(50,'ID nhà xuất bản có tối đa 50 ký tự'),
            'price': yup
                .number()
                .required('Thiếu đơn giá')
                .min(0, 'Đơn giá không âm')
                .max(1000000, 'Đơn giá tối đa 1.000.000'),
            'position': yup
                .string()
                .required('Vị trí không thể trống'),
            'genre': yup
                .string()
                .required('Thể loại không thể trống'),
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
        submitBook() {
            this.$emit('submit:book', this.book);
        },

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
