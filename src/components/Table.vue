<template>
    <div class="table-container">
        <div class="toolbar">
            <div class="tools">
                <i
                    id="editButton"
                    class="fas fa-2x fa-fw fa-edit"
                    @click="toggleEdit()"
                ></i>
                <i
                    id="deleteButton"
                    v-if="isEditing"
                    class="fas fa-2x fa-fw fa-trash"
                    @click="deleteSelected()"
                ></i>
            </div>
            <div class="searchbar">
                <i class="fas fa-fw fa-search"></i>
                <input
                    id="searchbar"
                    type="text"
                    placeholder="Search ..."
                    v-model="term"
                    @input="filterData(value.slice(0))"
                />
            </div>
        </div>
        <div class="table-wrapper">
            <table class="table row-hover">
                <thead ref="head">
                    <tr>
                        <th v-if="isEditing" class="checkbox-column">
                            <div class="pretty p-default">
                                <input type="checkbox" v-model="allSelected" />
                                <div class="state">
                                    <label></label>
                                </div>
                            </div>
                        </th>
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
                            <td v-if="isEditing" class="checkbox-column">
                                <div class="checkbox-container">
                                    <div class="pretty p-default">
                                        <input
                                            type="checkbox"
                                            v-model="selected[item.ID]"
                                        />
                                        <div class="state">
                                            <label></label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td v-for="column in columns" :key="column.field">
                                <div
                                    v-if="
                                        column.editable &&
                                            column.type === 'text'
                                    "
                                >
                                    <input
                                        type="text"
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
        <div v-if="isEditing" class="total-selected">
            Total Selected:
            <b>{{ totalSelected }}</b>
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
        return {
            data: [],
            dataDisplay: [],
            selected: {},
            isAscending: false,
            sortField: "",
            term: "",
            allSelected: false,
            isEditing: false
        };
    },
    watch: {
        value() {
            this.data = this.value.slice(0);
            this.filterData(this.data);
        },
        allSelected() {
            var $this = this;
            this.dataDisplay.forEach(item => {
                $this.selected[item.ID] = $this.allSelected;
            });
        }
    },
    computed: {
        totalSelected() {
            console.log("test");
            var total = 0;
            var pairs = Object.entries(this.selected);
            pairs.forEach(pair => {
                if (pair[1]) {
                    total += 1;
                }
            });
            return total;
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
        toggleEdit() {
            this.isEditing = !this.isEditing;
            if (this.isEditing) {
                this.selected = {};
            }
        },
        deleteSelected() {
            var selected = Object.entries(this.selected);
            selected.forEach(pair => {
                if (pair[1]) {
                    this.data = this.data.filter(item => {
                        return item.ID !== pair[0];
                    });
                }
            });
            this.selected = {};
            this.saveItems();
        },
        saveItems() {
            this.$emit("input", this.data);
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
@import "./../../node_modules/pretty-checkbox/src/pretty-checkbox.scss";
$body-color: transparent;
$text-color: black;
$border-color: rgb(177, 177, 177);
$hover-color: rgb(0, 0, 0);

.total-selected {
    text-align: right;
}
.checkbox-column {
    width: 20px;
    border: none;
}
.checkbox-column:hover {
    border: none;
}
.table-container {
    width: 75%;
    margin: auto;
}
.table-wrapper {
    float: left;
}
.scroll-area {
    position: relative;
    margin: auto;
    width: 100%;
    height: 600px;
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
    justify-content: space-between;
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
.tools {
    i {
        color: $border-color;
        transition: color 0.5s ease;
    }
    i:hover {
        color: $text-color;
    }
    padding: 10px;
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
    padding: 1rem;
    border-bottom: 3px solid $border-color;
    transition: border 0.5s ease;
}
th:hover {
    border-bottom: 3px solid $hover-color;
}
td {
    border-bottom: 1px solid $border-color;
    text-align: left;
    padding: 1rem;
    input[type="text"] {
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