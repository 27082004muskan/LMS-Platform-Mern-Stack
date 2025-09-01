
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


export const serverUrl="http://localhost:8000"
function App() {
 getCurrentUser()
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

    </Routes>
      
    </>
  )
}

export default App
