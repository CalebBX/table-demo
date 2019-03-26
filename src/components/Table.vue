<template>
    <div
        ref="table"
        class="table-wrapper  box-shadow"
        @scroll="onTableScroll()"
    >
        <table class="table row-hover">
            <thead ref="head">
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
                        <div v-if="column.editable && column.type === 'text'">
                            <input
                                v-model="item[column.field]"
                                @blur="saveItems()"
                                @keyup.enter="$event.target.blur"
                            />
                        </div>
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
        columns: Array,
        value: Array
    },
    data() {
        return { sortedData: [], isAscending: false, sortField: "" };
    },
    watch: {
        value() {
            this.sortedData = this.value;
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
            this.sortedData = this.value.sort(function(a, b) {
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
        },
        saveItems() {
            this.$emit("input", this.value);
        },
        onTableScroll() {
            var scrollTop = this.$refs.table.scrollTop;
            this.$refs.head.style.transform = "translateY(" + scrollTop + "px)";
        }
    },
    mounted() {
        this.sortedData = this.value;
    }
};
</script>
<style lang="scss">
$body-color: #fff;
$head-color: rgb(255, 255, 255);
$head-text-color: rgb(0, 0, 0);
$head-hover-color: rgb(130, 153, 255);
$hover-color: #eef1ff;
$border-color: #e7e7e7;
.table-wrapper {
    overflow: auto;
    height: 700px;
    max-width: 75%;
    margin: auto;
}
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

    margin-bottom: 2rem;
    border-collapse: collapse;
    // box-sizing: border-box;
}
input {
    width: 100%;
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
    color: $head-text-color;
}
tbody {
    background-color: $body-color;
}
th {
    background-color: $head-color;
    text-align: left;
    padding: 1.6rem;
    border-bottom: 3px solid $border-color;
    transition: background-color 0.5s ease;
    transition: border 0.5s ease;
}
th:hover {
    // background-color: $head-hover-color;
    border-bottom: 3px solid $head-text-color;
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