
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

//creating store and exporting it 
export const store=configureStore({
    reducer:{
        user:userSlice
    }
})