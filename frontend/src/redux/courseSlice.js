import { createSlice } from "@reduxjs/toolkit";




const courseSlice= createSlice ({
    name:"course",
    initialState:{
        creatorCourseData:null,
        courseData:null,
        loading:false
    },
    reducers:{
setCreatorCourseData:(state,action)=>{
    state.creatorCourseData=action.payload
},
setCourseData:(state,action)=>{
    state.courseData=action.payload
},
setLoading:(state,action)=>{
    state.loading=action.payload
}
    }
})
export const {setCreatorCourseData, setCourseData, setLoading}=courseSlice.actions
export default courseSlice.reducer