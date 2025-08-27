import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './customersSlice.js';

export default configureStore({
    reducer: {
        customersState: customersReducer
    }
});