import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditCourses = () => {
  const navigate = useNavigate();
  const {courseId}=useParams()
  const[isPublished , setIsPublished]=useState(true)
  const thumb = useRef()
  const [selectCourse , setSelectCourse] = useState(null)
  const[title , setTitle] = useState("")
   const[subtitle , setSubTitle] = useState("")
    const[description , setDescription] = useState("")
const[category, setCategory] = useState("")
const[level, setLevel] = useState("")
const[price, setPrice] = useState("")
const[frontendImage, setFrontendImage] = useState(img)
const[backendImage, setBackendImage] = useState(null)
const[loading, setLoading]=useState(false)


const handleThumbnail=(e)=>{
  const file = e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
}

  // FETCHING CONTROLLER
const getCourseById = async()=>{
  try {
    const result = await axios.get(serverUrl+`/api/course/getcoursebyid/${courseId}`, {withCredentials:true})
    console.log("API Response:", result.data)
    setSelectCourse(result.data)
  } catch (error) {
    console.log("API Error:", error)
  }
}


  useEffect(()=>{
if(selectCourse)
{
  setTitle(selectCourse.title || "")
  setSubTitle(selectCourse.subtitle || "")
  setDescription(selectCourse.description|| "")
  setCategory(selectCourse.category|| "")
  setLevel(selectCourse.level|| "")
  setPrice(selectCourse.price || "")
  setFrontendImage(selectCourse.thumbnail|| img)
  setIsPublished(selectCourse?.isPublished)

}  },[selectCourse])

  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse=async ()=>{
    console.log("Before saving - isPublished:", isPublished);
   setLoading(true)

    const formData = new FormData()
    formData.append("title",title)
    formData.append("subTitle",subtitle)
    formData.append("description",description)
    formData.append("category",category)
    formData.append("level",level)
    formData.append("price",price)
    formData.append("thumbnail",backendImage)
    formData.append("isPublished",isPublished)

    try {
      const result = await axios.post(serverUrl+`/api/course/editcourse/${courseId}`,
        formData,
        {withCredentials:true})
   console.log("Backend response:", result.data) // Add this line
      setLoading(false)
      navigate("/courses")
      toast.success("Course Updated")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message

      )
    }
  }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        {/* ARROW */}
      <FaArrowLeftLong  className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={()=> navigate("/courses")} />
       {/* HEADING  */}
       <h2 className='text-2xl font-semibold md:pl-[60px]'> Add Detail Information regarding the course</h2>
       {/* BUTTONS */}

       <div className='space-x-2 space-y-2'> <button className='bg-black text-white px-4 py-2 rounded-md'>Go to Lecture page</button>
       </div>
      </div>

      {/* form details page */}
      <div className='bg-gray-50 p-6 rounded-md'>
 {/* HEADING  */}
<h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
 {/* 2 BUTTONS */}

<div className='space-x-2 space-y-2'>
{!isPublished?  <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1' onClick={()=>setIsPublished(prev=>!prev)}> Click to Publish</button> :<button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1' onClick={()=>setIsPublished(prev=>!prev)}> Click to UnPublish</button> }


  <button className='bg-red-600 text-white px-4 py-2 rounded-md'>Remove Course</button>
</div>

{/* FORM */}
<form className='space-y-6' onSubmit={(e)=>e.preventDefault()}>

{/* 
  Course Title */}
  <div>
    <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
  <input id='title' type='text' className='w-full border px-4 py-2 rounded-md' placeholder='Course Title' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
  
  </div>


 {/* Sub Title */}
    <div>
    <label htmlFor='subtitle' className='block text-sm font-medium text-gray-700 mb-1'>SubTitle</label>
  <input id='subtitle' type='text' className='w-full border px-4 py-2 rounded-md' placeholder='Course SubTitle' onChange={(e)=>setSubTitle(e.target.value)} value={subtitle}></input>
  
  </div>


   {/* Description */}
    <div>
    <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
  <textarea id='des' type='text' className='w-full border px-4 py-2 rounded-md h-24 resize-none' placeholder='Course Description' onChange={(e)=>setDescription(e.target.value)} value={description}/>
  
  </div>

 
  <div className=' flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
    {/* FOR CATEGORIES */}
    <div className='flex-1' >
     <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1 '>Course Category</label>
<select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=>setCategory(e.target.value)} value={category}>

<option value="">Select Category</option>
<option value="App Development">App Development</option>
<option value="AI/ML">AI/ML</option>
<option value="Data Science">Data Science</option>
<option value="Data Analytics">Data Analytics</option>
<option value="UI/UX">UI/UX</option>
<option value="BlockChain">BlockChain</option>
<option value="Web Development">Web Development</option>
<option value="AI Tools">AI Tools</option>
<option value="Others">Others</option>


</select>

    </div>
     {/* FOR LEVELS */}
  <div className='flex-1' >
     <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1 '>Course Level</label>
<select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=>setLevel(e.target.value)} value={level}>

<option value="">Select Level</option>
<option value="Beginner">Beginner</option>
<option value="Intermediate">Intermediate</option>
<option value="Advanced">Advanced</option>

</select>

    </div>
      {/* FOR PRICE */}
     <div className='flex-1' >
     <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1 '>Course Price (INR)</label>
<input type="number" name='' id='price' className='w-full border px-4 py-2 rounded-md'
placeholder='₹'  onChange={(e)=>setPrice(e.target.value)} value={price}/>
    </div>
  </div>
  <div>
    <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
    <input type="file" hidden ref={thumb} accept='image/*' onChange={handleThumbnail}/>
  </div>

  <div className='relative w-[300px] h-[170px]'>
<img src={frontendImage} alt="" className='w-[100%] h-[100%] border-1 border-black rounded-[5px]' onClick={()=>thumb.current.click()}/>
<FaEdit className='w-[20px] h-[20px] absolute top-2 right-2' onClick={()=>thumb.current.click()}/>
  </div>

  
<div className='flex items-center justify-start gap-[15px]'>
  <button type="button" className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate("/courses")}>Cancel</button>
   <button type="button" className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' onClick={handleEditCourse}>{loading ?<ClipLoader size={30} color='white'/>: "Save"}</button>
  </div>
</form>
      </div>
      
    </div>
  )
}

export default EditCourses
