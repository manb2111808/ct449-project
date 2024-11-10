<template>
    <h4><b>Danh sách sách đang mượn</b></h4><br>
    <BorrowList 
        :borrows="borrow"
    />
</template>

<script>
import BorrowList from "@/views/BorrowList.vue";
import BookDetails from "@/services/bookDetail.service"

export default {
    data() {
        return {
            borrow: [],
        }
    },

    components: {
        BorrowList,
    },

    methods: {
        async retrieveBorrowed() {
            try {
                this.borrow = await BookDetails.getBorrow();
            } catch (error) {
                console.log();
            }
        },

        refreshList() {
            this.retrieveBorrowed();
        }
    },

    mounted() {
        this.refreshList();
    }
}
</script>