<template>
    <div>
        <div class="table-wrapper ">
            <table class="table row-hover">
                <thead>
                    <tr>
                        <th
                            v-for="column in columns"
                            :key="column.field"
                            @click="sortData(column.field, column.sortable)"
                        >
                            {{ column.label }}
                        </th>
                    </tr>
                </thead>
                <tbody v-for="item in sortedData" :key="item.id">
                    <tr>
                        <td v-for="column in columns" :key="column.field">
                            {{ item[column.field] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        columns: Array
    },
    data() {
        return { sortedData: [], isAscending: false, sortField: "" };
    },
    watch: {
        data() {
            this.sortedData = this.data;
        }
    },
    methods: {
        sortData(field, sortable) {
            if (!sortable) {
                return;
            }
            this.isAscending = !this.isAscending;
            var asc = this.isAscending;
            this.sortedData = this.data.sort(function(a, b) {
                if (asc) {
                    if (a[field] < b[field]) {
                        return -1;
                    }
                    if (a[field] > b[field]) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (a[field] < b[field]) {
                        return 1;
                    }
                    if (a[field] > b[field]) {
                        return -1;
                    }
                }
            });
        }
    }
};
</script>
<style lang="scss">
$table-color: #fff;
$hover-color: #eef1ff;
$border-color: #e7e7e7;
// .table-responsive-vertical {
//     @media screen and (max-width: 768px) {
//         // Tighten up spacing
//         .table {
//             margin-bottom: 0;
//             background-color: transparent;
//             thead,
//             tfoot {
//                 display: none;
//             }

//             tbody {
//                 display: block;
//                 tr {
//                     display: block;
//                     border: 1px solid $border-color;
//                     border-radius: 2px;
//                     margin-bottom: 1.6rem;
//                     td {
//                         display: block;
//                         background-color: $table-color;
//                         vertical-align: middle;
//                         text-align: right;
//                         border: 0;
//                         border-bottom: 1px solid $border-color;
//                     }
//                     td:last-child {
//                         border-bottom: 0;
//                     }
//                     td[data-title]:before {
//                         content: attr(data-title);
//                         float: left;
//                         font-size: inherit;
//                     }
//                     input {
//                         display: block;
//                     }
//                 }
//             }
//         }
//     }
// }

.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 2rem;
    background-color: $table-color;
    border-collapse: collapse;
}
input {
    padding: 0.7rem;
    margin: 0px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 0;
}
th {
    text-align: left;
    padding: 1.6rem;
}
tr {
    border-bottom: 1px solid $border-color;
}
td {
    text-align: left;
    padding: 1.6rem;
}
thead {
    tr {
        border-bottom-width: 2px;
    }
}
.row-hover {
    tbody {
        tr:hover {
            background-color: $hover-color;
            input {
                background-color: $hover-color;
            }
        }
    }
}
.table-wrapper {
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
        0 1px 2px 0 rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
        0 1px 2px 0 rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
}
</style>