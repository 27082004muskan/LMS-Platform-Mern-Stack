
import { Route ,Routes} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp";
import Login from './pages/Login';

function App() {
 

  return (
    <>
    <Routes>
<Route path='/home' element={<Home />} />
<Route path='/signup' element={<SignUp/>}/>
<Route path='/login'element={<Login/>}/>

    </Routes>
      
    </>
  )
}

export default App
