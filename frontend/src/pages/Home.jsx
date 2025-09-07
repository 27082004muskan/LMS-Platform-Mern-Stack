import React from 'react'
import Nav from '../components/Nav'
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import smallAi from "../assets/SearchAi.png";
import largeAi from "../assets/ai.png";
import Logos from '../components/Logos';

const Home = () => {
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav/>
        <img src={home} className='object-cover w-[100%] lg:h-[100%] h-[50vh]' alt=''/>
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>
          Grow Your Skills to Advance
        </span>
        <span className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold'>
          Your Career Path
        </span>

        {/* BUTTONS */}
        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap'>
          {/*View All Courses*/}
  <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white rounded-[10px] text-black[10px] text-[18px] font-light flex gap-2 cursor-pointer '>View All Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' /></button>

{/*Search With AI*/}
    <button className='px-[20px] py-[10px] border-2 lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center' >Search With AI 
      {/* image for large devices */}
      <img src={largeAi}  className='w-[30px] h-[30px] rounded-full hidden lg:block' alt=''/> 
{/* image for small devices */}
<img src={smallAi}  className='w-[35px] h-[35px] rounded-full lg:hidden' alt=''/>
       </button>
        </div>
       
      </div>
       <Logos/>
    </div>
  )
}

export default Home
