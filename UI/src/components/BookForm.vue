<template>
  <div class="book-form-container">
    <div class="form-card">
      <h2 class="form-title">Thông tin sách</h2>
      <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <!-- Book Name -->
        <div class="input-group">
          <label for="name">Tên sách:</label>
          <Field
            name="name"
            type="text"
            class="input-field"
            placeholder="Nhập tên sách"
            v-model="book.name"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>

        <!-- Author Name -->
        <div class="input-group">
          <label for="author-name">Tên tác giả:</label>
          <Field
            name="author-name"
            type="text"
            class="input-field"
            placeholder="Nhập tên tác giả"
            v-model="book.authorName"
          />
          <ErrorMessage name="author-name" class="error-message" />
        </div>

        <!-- Publisher Name -->
        <div class="input-group">
          <label for="publisherName">Tên nhà xuất bản:</label>
          <Field
            name="publisherName"
            type="text"
            class="input-field"
            placeholder="Nhập tên nhà xuất bản"
            v-model="book.publisherName"
          />
          <ErrorMessage name="publisherName" class="error-message" />
        </div>

        <!-- Publisher Address -->
        <div class="input-group">
          <label for="publisherAddress">Địa chỉ nhà xuất bản:</label>
          <Field
            name="publisherAddress"
            type="text"
            class="input-field"
            placeholder="Nhập địa chỉ nhà xuất bản"
            v-model="book.publisherAddress"
          />
          <ErrorMessage name="publisherAddress" class="error-message" />
        </div>

        <!-- Book Price -->
        <div class="input-group">
          <label for="price">Đơn giá:</label>
          <Field
            name="price"
            type="number"
            class="input-field"
            placeholder="Nhập giá sách"
            v-model="book.price"
          />
          <ErrorMessage name="price" class="error-message" />
        </div>

        <!-- Publish Year -->
        <div class="input-group">
          <label for="publishYear">Năm xuất bản:</label>
          <Field
            name="publishYear"
            type="number"
            class="input-field"
            placeholder="Nhập năm xuất bản"
            v-model="book.publishYear"
          />
          <ErrorMessage name="publishYear" class="error-message" />
        </div>

        <!-- Image URL -->
        <div class="input-group">
          <label for="image-url">Ảnh sách:</label>
          <Field
            name="image-url"
            type="text"
            class="input-field"
            placeholder="Nhập URL ảnh"
            v-model="book.imageURL"
          />
          <ErrorMessage name="image-url" class="error-message" />
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <button id="submit" class="btn btn-primary">
            Lưu
            <box-icon color="white" name="save"></box-icon>
          </button>
          <button
            v-if="book._id"
            type="button"
            class="btn btn-danger"
            @click.prevent="deleteBook"
          >
            Xóa
            <box-icon name="folder-minus" color="white"></box-icon>
          </button>
        </div>
      </Form>
    </div>
  </div>
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

                this.$router.push('/library');
            } catch (error) {
                console.error('Error adding publisher or book:', error);
            }
        },

        deleteBook() {
            this.$emit('delete:book', this.book._id);
            this.$router.push('/library');
        }
    },

    created(){
        this.bookLocalInfo = this.book;
    }

}
</script>

<style scoped>
.book-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #f4f6f9; */
}

.form-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #5c8aff;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #5c8aff;
  outline: none;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #5c8aff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #4b6fc3;
}

.btn-danger {
  background-color: #e74c3c;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>
