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
import Table from '@/components/Table.vue'

export default {
    name: 'TableDemo',
    components: {
        Table
    },
    computed: {
        payments: {
            get () {
                return this.$store.state.payments
            },
            set (payments) {
                this.$store.dispatch('savePayments', payments)
            }
        }
    },
    data () {
        return {
            //field: property name of data that will populate this column
            //label: column header text
            //sortable: whether or not column can be sorted by clicking column header
            //type: field type (needed for text input or date display)
            //editable: whether or not column can be edited (currently only works with type: text)
            //width: width of column. (sets width css property)
            
            columns: [
                {
                    field: 'Name',
                    label: 'Name',
                    sortable: true,
                    width: '20%'
                },
                {
                    field: 'Description',
                    label: 'Description',
                    type: 'text',
                    editable: true,
                    width: '50%'
                },
                {
                    field: 'Date',
                    label: 'Date',
                    type: 'date',
                    sortable: true,
                    width: '15%'
                },
                {
                    field: 'Amount',
                    label: 'Amount',
                    sortable: true,
                    width: '15%'
                }
            ]
        }
    },
    methods: {
        resetDB () {
            this.$store.dispatch('resetPaymentsDB')
        }
    },
    mounted () {
        this.$store.dispatch('getPaymentsFromDB')
    }
}
</script>
<style>
.reset {
    text-align: left;
}
.reset:hover {
    text-decoration: underline;
}
.root {
    margin: auto;
    width: 75%;
    max-width: 1000px;
    height: 60vh;
}
</style>
