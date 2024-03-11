import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    isbooth : {status:false}
}

const boothSlice = createSlice({
    name: 'isbooth',
    initialState: initialState,
    reducers:{
        setIsBooth(state,action){
            state.isbooth = action.payload
        }
    }
})

const { actions,reducer} = boothSlice
export const { setIsBooth } = actions
export default reducer