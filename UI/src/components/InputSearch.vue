<template>
    <input 
        type="text" 
        class="form-control" 
        placeholder="Nhập tên sách hoặc tên tác giả" 
        :value="modelValue"
        @input="updateModel"
        @keyup.enter="submit"
    />
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                <i class="fas fa-search"></i>Tìm kiếm
            </button>
        </div>
</template>

<script>
    export default {
        props: {
            modelValue: { type: String, default: ""},
        },

        emits: ["submit", "update:modelValue"],

        methods: {
            updateModel(event){
                this.$emit("update:modelValue", event.target.value);
            },

            submit(){
              this.$emit("submit");
            }
        }
    }
</script>