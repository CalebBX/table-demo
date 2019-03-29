<template>
    <div class="table-container">
        <div class="toolbar">
            <div class="searchbar">
                <i class="fas fa-fw fa-search"></i>
                <input
                    type="text"
                    placeholder="Search ..."
                    v-model="term"
                    @input="filterData(value.slice(0))"
                />
            </div>
        </div>
        <div ref="table" class="table-wrapper  " @scroll="onTableScroll()">
            <table class="table row-hover">
                <thead ref="head">
                    <tr>
                        <th
                            v-for="column in columns"
                            :key="column.field"
                            @click="
                                sortData(
                                    column.field,
                                    !isAscending,
                                    column.sortable
                                )
                            "
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

                <tbody>
                    <VuePerfectScrollbar class="scroll-area">
                        <tr v-for="item in dataDisplay" :key="item.id">
                            <td v-for="column in columns" :key="column.field">
                                <div
                                    v-if="
                                        column.editable &&
                                            column.type === 'text'
                                    "
                                >
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
                    </VuePerfectScrollbar>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
    props: {
        columns: Array,
        value: Array
    },
    components: {
        VuePerfectScrollbar
    },
    data() {
        return { dataDisplay: [], isAscending: false, sortField: "", term: "" };
    },
    watch: {
        value() {
            this.filterData(this.value.slice(0));
        }
    },
    methods: {
        sortData(field, order, sortable) {
            if (!sortable) {
                return;
            }
            this.sortField = field;
            this.isAscending = order;
            var asc = this.isAscending;
            this.dataDisplay.sort(function(a, b) {
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
        filterData(data) {
            const term = this.term;
            const columns = this.columns;
            this.dataDisplay = data.filter(item => {
                return columns.some(column => {
                    return item[column.field]
                        .toString()
                        .toLowerCase()
                        .includes(term.toLowerCase());

                    {
                    }
                });
            });
            this.sortData(this.sortField, this.isAscending, true);
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
        this.filterData(this.value.slice(0));
    }
};
</script>
<style lang="scss">
$body-color: transparent;
$text-color: black;
$border-color: rgb(177, 177, 177);
$hover-color: rgb(0, 0, 0);

.table-container {
    width: 75%;
    margin: auto;
}
.scroll-area {
    position: relative;
    margin: auto;
    width: 100%;
    height: 700px;
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
table {
    width: 100%;
    margin-bottom: 2rem;
    border-collapse: collapse;
}
.toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem;
}
input {
    font-family: inherit;
    font-size: inherit;
    background-color: transparent;
}
.searchbar {
    input {
        padding: 10px 10px 10px 40px;
        border: 2px solid $border-color;
        border-radius: 15px;
        -moz-border-radius: 15px;
        -webkit-border-radius: 15px;
        transition: border 0.5s ease;
    }
    input:focus {
        outline: none;
        border: 2px solid $hover-color;
    }
    i {
        color: $border-color;
        position: relative;
        left: 35px;
        transition: color 0.5s ease;
    }
}
.searchbar:hover {
    input {
        border: 2px solid $hover-color;
    }
    i {
        color: $hover-color;
    }
}

thead {
    color: $text-color;
    width: calc(100% - 1em);
}
thead,
tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    background-color: $body-color;
}
th {
    background-color: $body-color;
    text-align: left;
    padding: 1.6rem;
    border-bottom: 3px solid $border-color;
    transition: border 0.5s ease;
}
th:hover {
    border-bottom: 3px solid $hover-color;
}
tr {
    border-bottom: 1px solid $border-color;
}
td {
    text-align: left;
    padding: 1rem;
    input {
        width: 100%;
        padding: 1rem;
        margin: -1rem;
        border: 0;
    }
    input:focus {
        outline: none;
    }
}
</style>