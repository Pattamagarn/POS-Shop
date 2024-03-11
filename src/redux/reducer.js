import { combineReducers } from '@reduxjs/toolkit'
import transactionSlice from './transaction/transactionSlice'
import boothSlice from './transaction/boothSlice'

const rootReducer = combineReducers({
    isbooth : boothSlice,
    product : transactionSlice
 
})

export default rootReducer