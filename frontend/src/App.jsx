
import { Navigate, Route ,Routes} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import EditProfile from './pages/EditProfile.jsx';
import Dashboard from './pages/Educator/Dashboard.jsx';
import Courses from './pages/Educator/Courses.jsx';
import CreateCourses from './pages/Educator/CreateCourses.jsx';
import getCreatorCourse from './customHooks/getCreatorCourse.js';
import EditCourses from './pages/Educator/EditCourses.jsx';
import getPublishedCourse from './customHooks/getPublishedCourse.js';
import AllCourses from './pages/AllCourses.jsx';


export const serverUrl="http://localhost:8000"
function App() {
 getCurrentUser()
 getCreatorCourse()
 getPublishedCourse()
 const {userData}=useSelector(state=>state.user)

  return (

    <>
    <ToastContainer/>
    <Routes>
<Route path='/' element={<Home />} />
<Route path='/signup' element={!userData ?<SignUp/>:<Navigate to={"/"}/> }/>
<Route path='/login'element={<Login/>}/>
<Route path='/profile'element={userData? <Profile/>:<Navigate to={"/signup"}/>}/>
<Route path='/forget'element={userData? <ForgetPassword/>:<Navigate to={"/signup"}/>}/>
<Route path='/editProfile'element={userData? <EditProfile/>:<Navigate to={"/signup"}/>}/>

<Route path='/allcourses'element={userData? <AllCourses/>:<Navigate to={"/signup"}/>}/>

<Route path='/dashboard'element={userData?.role=="educator"? <Dashboard/>:<Navigate to={"/signup"}/>}/>

<Route path='/courses' element={userData?.role=="educator"? <Courses/>:<Navigate to={"/signup"}/>}/>

<Route path='/createcourse' element={userData?.role=="educator"? <CreateCourses/>:<Navigate to={"/signup"}/>}/>

<Route path='/editcourse/:courseId' element={userData?.role=="educator"? <EditCourses/>:<Navigate to={"/signup"}/>}/>

    </Routes>
      
    </>
  )
}

export default App
