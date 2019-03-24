<template>
    <div>
        <div class="table-wrapper ">
            <table class="table row-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody v-for="item in data" :key="item.id">
                    <tr>
                        <td data-title="Name">{{ item.Name }}</td>
                        <td data-title="Amount">{{ item.Amount }}</td>
                        <td data-title="Description"><input v-model="item.Description"></input></td>

                    </tr>
                </tbody>
            </table>
        </div>
        
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
<style lang="scss">
$table-color: #fff;
$hover-color: #dfe6ff;
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