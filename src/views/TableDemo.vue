<template>
    <div>
        <h2>Table Demo</h2>
        <div class="root">
            <Table v-model="payments" :columns="columns"></Table>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue";

export default {
    name: "TableDemo",
    components: {
        Table
    },
    computed: {
        payments: {
            get() {
                return this.$store.state.payments;
            },
            set(payments) {
                this.$store.dispatch("savePayments", payments);
            }
        }
    },
    data() {
        return {
            columns: [
                { field: "Name", label: "Name", sortable: true },
                {
                    field: "Description",
                    label: "Description",
                    type: "text",
                    editable: true
                },
                { field: "Date", label: "Date", type: "date", sortable: true },
                { field: "Amount", label: "Amount", sortable: true }
            ]
        };
    },
    mounted() {
        this.$store.dispatch("getPaymentsFromDB");
    }
};
</script>
<style>
.root {
    /* width: 100%;
    min-height: 100vh; */

    /* display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; */
}
</style>
