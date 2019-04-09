import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

var data = [
    { a: 'dog', b: '456', c: 'red' },
    { a: 'zebra', b: '789', c: 'red' },
    { a: 'cat', b: '123', c: 'blue' }
]
var columns = [
    { field: 'a', label: 'A', sortable: true },
    { field: 'b', label: 'B', sortable: true },
    { field: 'c', label: 'C' }
]
describe('Table.vue', () => {
    describe('Initial render', () => {
        var wrapper = shallowMount(Table, {
            propsData: { value: data, columns }
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
            propsData: { value: data, columns }
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
            propsData: { value: data, columns }
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
})
