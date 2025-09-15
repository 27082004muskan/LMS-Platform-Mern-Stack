import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from "./Card"

const CardPage = () => {
    const {courseData} = useSelector(state => state.course)
    const [popularCourses, setPopularCourses] = useState([])

    useEffect(() => {
        setPopularCourses(courseData?.slice(0, 6))
    }, [courseData])

    return (
        <div className='relative flex items-center justify-center flex-col w-full'>
            <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
                Our Popular Courses
            </h1>

            <span className='large:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>
                Explore top-rated courses designed to boost your skills, enhance careers and unlock opportunities in Tech, AI, business and beyond.
            </span>

            <div className='w-[100%] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
                {
                    popularCourses?.map((course, index) => (
                        <Card 
                            key={course._id || index} 
                            thumbnail={course.thumbnail} 
                            title={course.title} 
                            category={course.category} 
                            price={course.price}
                            id={course._id} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CardPage
