# table-demo

## BriteCore questions
* _Deployment method_
   * The project uses the vue_cli settings with webpack to build for production. The project is deployed on Github Pages.
* _How long did you spend on the test? Would you do anything differently if you had more time?_
    * I spent about 16 hours completing the project. It took a little longer than expected because I was chipping away at it a few hours at a time. 
    * If I had more time I probably would have added a few extra editing features such as the abilty to add items, modifiable date fields, table, and made some stylistic changes. There are serveral improvments I could have made to increase resusablity as well.

* _In what ways would you adapt your component so that it could be used in many different scenarios where a data table is
required?_
    * __Already implemented__
        * Stylistically the table fills its parent container so its easy to change the size and proportions of the table without having to modify the component's css.
        * Several properties of each column can be adjusted to fit the individual needs of each set of data. (width, sortablility, editability, label display, data type)
        * The table accepts a value prop and emits an input event when data is changed. So it can be used with v-model just like a regular input.
    * __Future__
        * Emit events to parent when certain actions are taken. Ex: onRowClick, onSort, onSave, onDelete
        * Ability to edit scss properties to style table from parent without modifying resuable component's css.
        * Add more modifiable fields such as date, bool, currency
        * Add user conformation modal before major changes. Ex: Are you sure you want to delete?
* _What CSS property did you recently learn about that helped you on a project?_
    * Until this project I had not used the `display: table` property. I used it in addition to a few other properties and third party pretty scroll bar js plugin to allow the header of the html table to stay fixed while the body scrolled.
* _What is your favorite modern Javascript feature? Why?_
    * Personally I really like how easy it is to work with arrays in JS. Weather its functions like map or filter for looping over arrays or being able to push and split items in an array.
* _What is your favorite third-party Vue.js library? Why?_
    * One of my faviorite third-party libraries specifically designed to work with Vue.js is Buefy, which is a css library based on bulma that integrates very nicely with vue and makes it so I don't have to write so much css.




## Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Run your unit tests
```
npm run test:unit
```

## Usage

### Props
---
#### Value: Array<Object>
Sets data available to table.
_Note: data will only be displayed if field is set in columns prop_

`v-model` can be used unless otherwise needed
```
<Table v-model="data"></Table>
```
This is the same as
```
<Table
   v-bind:value="data"
   v-on:input="data = $event"
></Table
```
#### id_field: String
Required for any modification or Deletion. Sets the field name used for each object id

#### columns: Array<Object>
Sets additional properties for each column
* __field: *String*__ (Required) property name of data that will populate this column
* __label: *String*__ column header text
* __sortable: *Boolean*__ whether or not column can be sorted by clicking column header
* __type: *String ('text', 'date')*__ field type (needed for text input or date display)
* __editable: *Boolean*__ whether or not column can be edited (currently only works with type: text)
* __width: *String*__ width of column. (sets width css property) If none set all columns will be spaced equally.

### Example
---
```
<template>
    <div>
        <Table v-model="data" :columns="columns" id_field="id"></Table>
    </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue'

export default {
    components: {
        Table
    },
    data () {
        return {
            data: [
                {
                    id: 1,
                    name: "Alex",
                    description: "Natoque penatibus et magnis dis parturient montes.",
                    date: "2017-07-23T04:24:49-07:00,345.54"
                },
                {
                    id: 2,
                    name: "Carl",
                    description: "Elit eget gravida cum sociis.",
                    date: "2018-11-08T05:44:15-08:00,677.08"
                },
                {
                    id: 3,
                    name: "Sara",
                    description: "Nam aliquam sem et tortor.",
                    date: "2018-12-26T09:43:45-08:00,-792.3"
                }
            ]
            columns: [
                {
                    field: 'name',
                    label: 'Name',
                    sortable: true,
                    width: '30%'
                },
                {
                    field: 'desc',
                    label: 'Description',
                    type: 'text',
                    editable: true,
                    width: '50%'
                },
                {
                    field: 'date',
                    label: 'Date',
                    type: 'date',
                    sortable: true,
                    width: '20%'
                }
            ]
        }
    },
}
</script>

```