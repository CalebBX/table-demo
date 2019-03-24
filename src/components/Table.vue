<template>
    <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Amount</th>
            </tr>
            <tr v-for="item in data" :key="item.id">
                <td>{{ item.Name }}</td>
                <td>{{ item.Amount }}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        data: Array
    },
    methods: {}
};
</script>
<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>