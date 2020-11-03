import axios from 'axios'

const { combineReducers } = require("redux")

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//save switch case needed values to variables to avoid syntax errors with misspellings

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

//this is how to format an axios request within redux

export const requestBudgetData = () =>{
    let data = axios.get('/api/budget-data').then(res=> res.data)
    return{
        //always return a payload that is the same variable as your axios request. 

        //type determins what the request is/will do when the switch case is invoked.

        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}


export const addPurchase = (price, description, category) =>{
    let data = axios.post('/api/budget-data/purchase', {
        description,
        price,
        category 
    }).then(res=> res.data);
    return {
        type:ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) =>{
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res=> res.data);
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}
//switch cases go in the export default

//this first one says that if a request is pending, display the loading animation, the animation is tied to a T/F value which is changed depending on the request step (pending,fulfilled, rejected)

// Once the axios request has been fulfilled, return the current state with the data from the axios request added on. Also changes the loading to false thus stopping the animation. 

//always have a default that just returns state 

export default function reducer (state = initialState, action){
    switch (action.type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED' :
            return {...state,...action.payload,loading:false}
        case ADD_PURCHASE +'_PENDING' :
            return {...state, loading:true}
        case ADD_PURCHASE + '_FULFILLED' :
            return {...state, purchases:action.payload, loading:false}
        case REMOVE_PURCHASE + '_PENDING':
            return {...state, loading: true};
        case REMOVE_PURCHASE + '_FULFILLED' :
            return{...state, purchases:action.payload, loading:false} 
        default: 
            return state
    }

}