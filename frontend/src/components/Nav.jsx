import React, { useState } from 'react'
import logo from "../assets/logo1.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";


const Nav = () => {
    const {userData}=useSelector((state)=>state.user)
    const navigate =useNavigate();
    const dispatch= useDispatch();
    const[show , setShow] = useState(false)
    const[showHam , setShowHam]= useState(false)

    const handleLogout=async()=>{
      try{
        const result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
        console.log(result.data);
        dispatch(setUserData(null))
        toast.success("Logout Successfully")
        navigate("/login")   // redirect to login after logout
      } catch(error){
        console.log(error);
        toast.error(error.response.data.message)
      }
    }
  return (
    <div>
      <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>

{/* logo image  */}
<div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
<img src={logo} alt='' className='w-[60px] rounded-[5px] border-2 border-white cursor-pointer'/>


</div>

{/*log out profile image */}
<div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>

{!userData &&  <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' onClick={()=>setShow(prev=>!prev)}/>}

 {/* the one who login will get it's name letter on profile */} 
 {/* photo URL bhi lagega */}
{userData?.photoUrl ? <img src={userData?.photoUrl}  className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'onClick={()=>setShow(prev=>!prev)} /> :
<div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)} >
{userData?.name.slice(0,1).toUpperCase()}

</div> }
{/* dashboard button */}
{userData?.role==="educator" &&  <div className='px-[20px] py-[10px] border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/dashboard")}>DashBoard</div>}

{/* log out / login button */}
{userData? 
<span className='px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handleLogout} >LogOut </span> 
:
<span className='px-[20px] py-[10px] border-2 border-white text-white bg-[#000000d5] rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/login")} >Login </span> }

{/* profile , courses div*/}
{show && <div className='absolute top-[110px] right-[15%] flex items-center justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-cursor-pointer hover:bg-black'>
  <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={()=>navigate("/profile")}>My Profile</span>
  <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>My Courses</span>
</div>}



</div>

{/*------------------------------------------------------------ */}

{/* hamburger menu for small devices */}
<RxHamburgerMenu  
  className="w-[35px] h-[35px] lg:hidden text-white fill-black cursor-pointer"
  onClick={() => setShowHam(prev => !prev)}
/>

<div
  className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden 
    transition-transform duration-700 
    ${showHam ? "translate-x-0" : "-translate-x-full"}`}
>

  {/* cross button to close the menu */}
 <RxCross2 
  className="w-[35px] h-[35px] text-white absolute top-5 right-[4%] cursor-pointer"  
  onClick={() => setShowHam(prev => !prev)} 
/>



  {/* menu items */}
  {!userData &&  <IoPersonCircle className='w-[50px] h-[50px] fill-white cursor-pointer' />}

 {/* Profile in mobile*/}
{userData?.photoUrl ? <img src={userData?.photoUrl
} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'/>: <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' >
{userData?.name.slice(0,1).toUpperCase()}
</div> }
{/* log out / login button */}
<div className='w-[200px] h-[65px] border-2 border-white text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate("/profile")}>My Profile</div>

<div className='w-[200px] h-[65px] border-2 border-white text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'>My Courses</div>

{userData?.role==="educator" &&  <div className='w-[200px] h-[65px]  border-2 border-white text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate("/dashboard")}>DashBoard</div>}

{/* log out / login button */}
{userData? 
<span className='w-[200px] h-[65px]  border-2 border-white text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer' onClick={handleLogout} >LogOut </span> 
:
<span className='w-[200px] h-[65px]  border-2 border-white text-white bg-[black] flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/login")} >Login </span> }

</div>
 
      </div>
    </div>
  )
}

export default Nav
