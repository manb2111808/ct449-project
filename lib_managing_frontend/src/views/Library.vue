<template>
    <div class="page row">
        <div class="col-md-4">
            <Guide />
        </div>
        <div class="col-md-8">
            <BookSearchCard />
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import BookSearchCard from "@/components/BookSearchCard.vue";
export default {
    components: {
        BookSearchCard,
        RouterLink,
    }
}
</script>

<style scoped>
.page {
    background-color: #FFFFFF;
    padding: 30px;
}
</style>