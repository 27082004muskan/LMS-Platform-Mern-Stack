import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import Card from '../components/Card';

const AllCourses = () => {
    const navigate = useNavigate()
    const {courseData}=useSelector(state=>state.course)
     const [category,setCategory]=useState([])
     const[filterCourse,setFilterCourse]=useState([])

     const toogleCategory =(e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(c=>c!==e.target.value))
        }else{
            setCategory(prev=>[...prev,e.target.value])
        }
     }

     const applyFilter =()=>{
        let courseCopy = courseData?.slice()
        if(category.length>0){
            courseCopy=courseCopy.filter(c=>category.includes(c.category))
        }
        setFilterCourse(courseCopy)
     }
     
     useEffect(()=>{
        setFilterCourse(courseData)
     },[courseData])

     useEffect(()=>{
        applyFilter()
     },[category])

  return (
    <div className='flex min-h-screen bg-gray-50'>
        <Nav/>

        {/* sidebar */}
        <aside className='w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5'>
            <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'><FaArrowLeftLong  className='text-white' onClick={()=>navigate("/")}/>Filter by Category</h2>
          
            <form action="" onSubmit={(e)=>e.preventDefault()} className='space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl'>
                <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer'>Search with AI <img src={ai} className='w-[30px] h-[30px] rounded-full'    alt="" /> </button>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={' App Development'} onChange={toogleCategory}/>
                    App Development
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={'Web Development'} onChange={toogleCategory} />
                    Web Development
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={'    UI/UX'} onChange={toogleCategory} />
                   UI/UX
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md'  value={'BlockChain'} onChange={toogleCategory}/>
                    BlockChain
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={'  Data Science'} onChange={toogleCategory} />
                    Data Science
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={'  Data Analytics'} onChange={toogleCategory} />
                    Data Analytics
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={' AI tools'} onChange={toogleCategory} />
                    AI tools
                </label>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                    <input type="checkbox"className='accent-black w-4 h-4 rounded-md' value={'Others'} onChange={toogleCategory}/>
                  Others
                </label>
            </form>
        </aside>

        {/* MAIN - ONLY CHANGE: Added ml-[260px] */}
        <main className='w-full transition-all duration-300 py-[130px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px] ml-[260px]'>
            {
                filterCourse?.map((course,index)=>(
                    <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price}
                        id={course._id}/>
                ))
            }
        </main>
    </div>
  )
}

export default AllCourses
