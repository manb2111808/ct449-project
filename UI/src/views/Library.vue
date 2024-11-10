<template>
    <div class="page row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <BookSearchCard/>
        </div>
        <div class="col-md-1"></div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import BookSearchCard from "@/components/BookSearchCard.vue";
export default {
    components: {
        BookSearchCard,
        RouterLink,
    },
    
    
}
</script>

<style scoped>

.page {
    background-color: #FFFFFF;
    padding: 30px;
}
</style>