import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { SiUikit } from "react-icons/si";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa6";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";
import { SiWeb3Dotjs } from "react-icons/si";

const ExploreCourses = () => {
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
      
      {/* left/top div */}
      <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>

{/* HEADING  */}
      <span className='text-[35px] font-semibold'>Explore</span>
      <span className='text-[35px] font-semibold'>Our Courses</span>
      <p className='text-[17px]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta explicabo voluptate suscipit animi ipsum nulla, inventore aspernatur, pariatur temporibus neque rem architecto? Sed repellat ipsam molestias quae iure velit a!</p>
      <button className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer'>Explore Courses
        <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' />
      </button>

      </div>

       {/* right/bottom div */}
      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>

{/* Web Development SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
<TbDeviceDesktopAnalytics className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
Web Dev
</div>

{/* UI/UX Designing SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#edfbd9] rounded-lg flex items-center justify-center'>
<SiUikit className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
UI/UX Designing
</div>

{/* App Dev SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#fbd9e4] rounded-lg flex items-center justify-center'>
<MdAppShortcut className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
App Dev
</div>


{/* Ethical Hacking SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#ded9fb] rounded-lg flex items-center justify-center'>
<FaHackerrank className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
Ethical Hacking
</div>


{/* AI/ML SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#fbe8d9] rounded-lg flex items-center justify-center'>
<TbBrandOpenai className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
AI/ML 
</div>


{/* Data Science SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#fbd9f8] rounded-lg flex items-center justify-center'>
<SiGoogledataproc className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
Data Science
</div>


{/* Data Analytics SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#d9fbe2] rounded-lg flex items-center justify-center'>
<FaClipboardList className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
Data Analytics
</div>

{/* Web3 SVG  */}
<div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
    {/* SVG BOX  */}
    <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
<SiWeb3Dotjs className='w-[60px] h-[60px] text-[#6d6c6c]'/>
</div>
Web3
</div>
      </div>
    </div>
  )
}

export default ExploreCourses
