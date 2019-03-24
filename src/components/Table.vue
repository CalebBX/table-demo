<template>
    <div>
        <table class="table row-hover box-shadow">
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
                        <input
                            v-if="column.editable && column.type === 'text'"
                            v-model="item[column.field]"
                        />
                        <div v-else-if="column.type === 'date'">
                            {{
                                new Date(
                                    item[column.field]
                                ).toLocaleDateString()
                            }}
                        </div>
                        <div v-else>{{ item[column.field] }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
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
$body-color: #fff;
$head-color: rgb(70, 104, 255);
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
    border-collapse: collapse;
    box-sizing: border-box;
}
input {
    font-family: inherit;
    font-size: inherit;
    padding: 1rem;
    margin: -1rem;
    border: 0;
    :focus {
        background-color: $body-color;
    }
}
thead {
    background-color: $head-color;
    color: white;
}
tbody {
    background-color: $body-color;
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
    padding: 1rem;
}

.row-hover {
    tbody {
        tr:hover {
            background-color: $hover-color;
            input:not(:focus) {
                background-color: $hover-color;
            }
        }
    }
}
.box-shadow {
    $shadow: 0 1px 3px 3px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    -webkit-box-shadow: $shadow;
    -moz-box-shadow: $shadow;
    box-shadow: $shadow;
}
</style>