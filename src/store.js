import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'https://britecore-coding-test.firebaseio.com'

export default new Vuex.Store({
    state: {
        payments: []
    },
    mutations: {
        setPayments (state, payments) {
            state.payments = payments
        }
    },
    actions: {
        getPaymentsFromDB (context) {
            axios.get(API_URL + '/payments.json').then(res => {
                context.commit('setPayments', res.data)
            })
        },
        savePayments (context, payments) {
            context.commit('setPayments', payments)
            axios.put(API_URL + '/payments.json', this.state.payments).then(res => {
                console.log(res)
            })
        }
    }
})
