import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

const Dashboard = () => {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate();

  return (
    <div className='flex min-h-screen bg-gray-100'>
        <FaArrowLeftLong className='w-[22px] absolute top-4 left-4 sm:top-6 sm:left-6 md:top-[10%] md:left-[10%] h-[22px] cursor-pointer z-10' onClick={()=>navigate("/")}/>
      <div className='w-full px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 bg-gray-50 space-y-10'>
 {/* main section */}
<div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-8'>
<img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} 
className='w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-black shadow-md'
alt="Educator"/>
<div className='text-center md:text-left space-y-3 sm:space-y-4'>
    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>Welcome , {userData?.name || "Educator"} 👋 </h1>
    <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>Total Earning:0</h1>
    <p className='text-gray-600 text-sm sm:text-base'>{
        userData?.description || "Start Creating Courses for your Students"}
    </p>
    <h1 className='px-6 sm:px-8 text-center py-3 sm:py-4 border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-4 cursor-pointer mt-4' onClick={()=>navigate("/courses")} > Create Courses</h1>
</div>
</div>
{/* graph section */}
<div>

</div>

      </div>

    </div>
  )
}

export default Dashboard
