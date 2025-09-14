
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import courseSlice from "./courseSlice"

//creating store and exporting it 
export const store=configureStore({
    reducer:{
        user:userSlice,
        course:courseSlice
    }
})