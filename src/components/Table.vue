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
                        <i
                            v-if="sortField === column.field"
                            class="fas fa-fw fa-arrow-up arrow-rotate"
                            :class="{ down: !isAscending }"
                        ></i>
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
            this.sortField = field;
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
$head-hover-color: rgb(130, 153, 255);
$hover-color: #eef1ff;
$border-color: #e7e7e7;
.arrow-rotate {
    transition: background-color 0.5s ease;
    -moz-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
}
.arrow-rotate.down {
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
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
    transition: background-color 0.5s ease;
    :focus {
        background-color: $body-color;
    }
}
thead {
    color: white;
}
tbody {
    background-color: $body-color;
}
th {
    background-color: $head-color;
    text-align: left;
    padding: 1.6rem;

    transition: background-color 0.5s ease;
    transition: text-decoration 0.5s ease;
}
th:hover {
    background-color: $head-hover-color;
}
tr {
    border-bottom: 1px solid $border-color;
    transition: background-color 0.5s ease;
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