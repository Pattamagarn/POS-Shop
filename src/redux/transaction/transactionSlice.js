import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product : {status:false}
}

const transactionSlice = createSlice({
    name:'product',
    initialState : initialState,
    reducers : {
        addProduct(state,action){
            state.product = action.payload
        },
    }
})

const {actions,reducer} = transactionSlice
export const {addProduct,setTotalPrice,incrementProduct,decrementProduct} = actions
export default reducer