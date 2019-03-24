<template>
    <div>
        <h2>Table Demo</h2>
        <div class="root">
            <Table :data="items" :columns="columns"></Table>
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
    data() {
        return {
            items: [],
            columns: [
                { field: "Name", label: "Name", sortable: true },
                {
                    field: "Description",
                    label: "Description",
                    type: "text",
                    editable: true
                },
                { field: "Date", label: "Date", type: "date" },
                { field: "Amount", label: "Amount", sortable: true }
            ]
        };
    },
    methods: {
        getItems() {
            var $this = this;
            this.$http
                .get(
                    "https://britecore-coding-test.firebaseio.com/payments.json"
                )
                .then(res => ($this.items = res.data));
        }
    },
    created() {
        this.getItems();
    }
};
</script>
<style>
.root {
    width: 100%;
    min-height: 100vh;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
