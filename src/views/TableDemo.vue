<template>
    <div>
        <div class="reset" @click="resetDB()">Reset Sample DB</div>
        <h2>Table Demo</h2>
        <div class="root">
            <Table v-model="payments" :columns="columns" id_field="ID"></Table>
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
    methods: {
        resetDB() {
            this.$store.dispatch("resetPaymentsDB");
        }
    },
    mounted() {
        this.$store.dispatch("getPaymentsFromDB");
    }
};
</script>
<style>
.reset {
    text-align: left;
}
.reset:hover {
    text-decoration: underline;
}
</style>
