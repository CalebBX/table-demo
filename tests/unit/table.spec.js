import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

const data = [
    { id: 1, a: 'dog', b: 'train', c: 'red' },
    { id: 2, a: 'zebra', b: 'car', c: 'red' },
    { id: 3, a: 'cat', b: 'bus', c: 'blue' }
]
const columns = [
    {
        field: 'a',
        label: 'A',
        sortable: true
    },
    {
        field: 'b',
        label: 'B',
        sortable: true,
        type: 'text',
        editable: true
    },
    { field: 'c', label: 'C' }
]
const id_field = 'id'
describe('Table.vue', () => {
    describe('Initial render', () => {
        var wrapper = shallowMount(Table, {
            propsData: { value: data, columns, id_field }
        })

        it('renders column labels', () => {
            expect(wrapper.find('th').text()).to.equal('A')
        })
        it('renders data fields', () => {
            expect(wrapper.find('td').text()).to.equal('dog')
        })
    })

    describe('User clicks sortable column header', () => {
        var wrapper = shallowMount(Table, {
            propsData: { value: data, columns, id_field }
        })
        it('Sorts field ascending', () => {
            wrapper.find('th').trigger('click')
            expect(wrapper.find('td').text()).to.equal('cat')
        })
        it('Sorts field decending', () => {
            wrapper.find('th').trigger('click')
            expect(wrapper.find('td').text()).to.equal('zebra')
        })
    })
    describe('User types in searchbar', () => {
        var wrapper = shallowMount(Table, {
            propsData: { value: data, columns, id_field }
        })
        var tbody = wrapper.find('tbody')
        it('Search bar filters items', () => {
            wrapper.find('#searchbar').setValue('red')
            expect(tbody.text()).to.include('zebra')
            expect(tbody.text()).to.include('dog')
            expect(tbody.text()).to.not.include('cat')

            wrapper.find('#searchbar').setValue('blue')
            expect(tbody.text()).to.include('cat')
            expect(tbody.text()).to.not.include('dog')
        })
        it('Empty searchbar returns table to previous state', () => {
            wrapper.find('#searchbar').setValue('')
            expect(tbody.text()).to.include('zebra')
            expect(tbody.text()).to.include('dog')
            expect(tbody.text()).to.include('cat')
        })
    })
    describe('User modifies an editable field', () => {
        var wrapper = shallowMount(Table, {
            propsData: { value: data, columns, id_field }
        })
        var tbody = wrapper.find('tbody')

        it('Inputs exist in table', () => {
            expect(tbody.contains('input')).to.equal(true)
        })
        it('Input updates state', () => {
            expect(wrapper.vm.value[0].b).to.equal('train')
            wrapper.find('td input').setValue('airplane')
            expect(wrapper.vm.value[0].b).to.equal('airplane')
        })
    })
    describe('User deletes item from table', () => {
        var wrapper = shallowMount(Table, {
            propsData: { value: data, columns, id_field }
        })
        var tbody = wrapper.find('tbody')
        it('Edit button shows checkboxes', () => {
            expect(tbody.contains('input[type="checkbox"]')).to.equal(false)
            wrapper.find('#editButton').trigger('click')
            expect(tbody.contains('input[type="checkbox"]')).to.equal(true)
        })
        it('Checkbox adds item to selected list', () => {
            expect(wrapper.vm.selected).to.be.empty
            wrapper.find('td input[type="checkbox"').trigger('click')
            expect(JSON.stringify(wrapper.vm.selected)).to.equal('{"1":true}')
        })
        it('Delete button removes selected items', () => {
            expect(wrapper.vm.data.length).to.equal(3)
            wrapper.find('#deleteButton').trigger('click')
            expect(wrapper.vm.data.length).to.equal(2)
            expect(wrapper.vm.selected).to.be.empty
        })
    })
})
