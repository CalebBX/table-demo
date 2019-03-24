<template>
    <Table :data="items" :columns="columns"></Table>
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
        return { items: [], columns: [] };
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
