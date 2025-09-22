import axios from 'axios';
import React, { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import img from "../../assets/empty.jpg";
import { setCreatorCourseData, setLoading } from '../../redux/courseSlice';
// import getCreatorCourse from '../../customHooks/getCreatorCourse';

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  const { creatorCourseData, loading } = useSelector(state => state.course);
  // getCreatorCourse()

  // Fetch creator courses on component mount
useEffect(() => {
  // Only fetch if user is authenticated
  if (!userData?._id) {
    console.log('User not authenticated, skipping courses fetch');
    return;
  }

  const creatorCourses = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true });
      console.log("Course data:", result.data); // Add this to see the data
      console.log("First course isPublished:", result.data[0]?.isPublished, typeof result.data[0]?.isPublished); // Debug line
      dispatch(setCreatorCourseData(result.data));
    } catch (error) {
      console.log(error);
      dispatch(setCreatorCourseData([])); // Set empty array on error
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  creatorCourses();
}, [userData?._id, dispatch]); // Only depend on user ID to prevent unnecessary re-renders


  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
        {/* COURSES / LEFT ARROW SVG  */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
          <div className='flex items-center justify-center gap-3'>
            <FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/dashboard")} />
            <h1 className='text-2xl font-semibold'>All Created Courses</h1>
          </div>
          <button className='bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500' onClick={() => navigate("/createcourse")}>
            Create Course
          </button>
        </div>

        {/* FOR LARGE SCREEN TABLE */}
        <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          ) : (
            <table className='min-w-full text-sm'>
              <thead className='border-b bg-gray-50'>
                <tr>
                  <th className='text-left py-3 px-4'>Courses</th>
                  <th className='text-left py-3 px-4'>Price</th>
                  <th className='text-left py-3 px-4'>Status</th>
                  <th className='text-left py-3 px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  creatorCourseData && creatorCourseData.length > 0 ? creatorCourseData.map((course, index) => (
                  <tr key={index} className='border-b hover:bg-gray-50 transition duration-200'>
                    <td className='py-3 px-4 flex items-center gap-4'>
                      {course?.thumbnail?<img src={course?.thumbnail} className='w-25 h-14 object-cover rounded-md' alt={course.title} />:<img src={img} className='w-25 h-14 object-cover rounded-md' alt={course?.title} />}
                      <span>{course?.title}</span>


                    </td>
                  {course?.price?    <td className='px-4 py-3'>{course?.price}</td>
                  :
                    <td className='px-4 py-3'>₹ NA</td>}



                    <td className='px-4 py-3'>
                      <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? "bg-green-100 text-green-600": "bg-red-100 text-red-600"} `}>
                       {course.isPublished ? "Published": "Draft"}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <FaEdit 
                        className='text-gray-600 hover:text-blue-600 cursor-pointer'
                        onClick={()=>navigate( `/editcourse/${course?._id}`)}
                      />
                    </td>
                  </tr>
               
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No courses found. Create your first course!
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          )}
          <p className='text-center text-sm text-gray-400 mt-6'>A list of your recent courses.</p>
        </div>

        {/* FOR SMALL SCREEN TABLE */}
        <div className='md:hidden space-y-4'>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Loading courses...</span>
            </div>
          ) : creatorCourseData && creatorCourseData.length > 0 ? (
            creatorCourseData.map((course, index) => (
              <div key={course._id || index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'>
                <div className='flex gap-4 items-center'>
                  <img src={course.thumbnail || img} alt={course.title} className='w-16 h-16 rounded-md object-cover' />
                  <div className='flex-1'>
                    <h2 className='font-medium text-sm'>{course.title || "Untitled Course"}</h2>
                    <p className='text-gray-600 text-xs mt-1'>₹{course.price || "NA"}</p>
                  </div>
                  <FaEdit 
                    className='text-gray-600 hover:text-blue-600 cursor-pointer'
                    onClick={()=>navigate( `/editcourse/${course?._id}`)}
                  />
                </div>
                <span className={`w-fit px-3 py-1 text-xs rounded-full ${course.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {(course.isPublished === true || course.isPublished === "true") ? 'Published' : 'Draft'}

                </span>
              </div>
            ))
          ) : (
            <div className='bg-white rounded-lg shadow p-8 text-center text-gray-500'>
              No courses found. Create your first course!
            </div>
          )}
          <p className='text-center text-sm text-gray-400 mt-4'>A list of your recent courses.</p>
        </div>
      </div>
    </div>
  )
}

export default Courses
