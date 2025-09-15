import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'


const getCreatorCourse = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {userData} = useSelector(state=>state.user)

  return (  // eslint-disable-next-line react-hooks/rules-of-hooks
   useEffect(()=>{
const creatorCourses = async()=>{
    try {
        const result = await axios.get(serverUrl+"/api/course/getcreator",{withCredentials:true})
        console.log(result.data)
        dispatch(setCreatorCourseData(result.data))
    } catch (error) {
        console.log(error)
       
}
}
creatorCourses()
   },[dispatch, userData])
  )
}

export default getCreatorCourse
