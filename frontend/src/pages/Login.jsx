import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import Google from "../assets/google.jpg";
import logo from "../assets/logo1.jpg";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
   const [email , setEmail]=useState("");
      const [password , setPassword]=useState("");
      const[loading , setLoading]=useState(false);

  const navigate = useNavigate();
 
  const handleLogin=async()=>{
setLoading(true)
try{
const result=await axios.post(serverUrl+"/api/auth/login",{email:email,password:password},{withCredentials:true})
console.log(result.data);
toast.success("Login Successfully")
navigate('/home')
}catch(error){
console.log(error);
setLoading(false)
toast.error(error.response.data.message)
}
  }

  return (
    <div>
      {/* bg ,width , height    */}
      <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex justify-center items-center gap-3">

        {/* md=mid devices */}
        <form className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex" onSubmit={(e)=>e.preventDefault()}>


          {/*left div*/}
          <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
            <div>
              <h1 className="font-semibold text-[black] text-2xl">
                Welcome back
              </h1>
              <h2 className="text-[#999797] text-[18px]">
                Login in your account
              </h2>
            </div>

            {/* input fields-E-MAIL  */}
            <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
              <label htmlFor="email" className="font-semibold">
                E-mail{" "}
              </label>
              <input
                id="email"
                type="email"
                className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
                placeholder="Your email"
                onChange={(e)=> setEmail(e.target.value)} value={email}
              />
            </div>

            {/* input fields-PASSWORD  */}
            <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                type={show ? "text" : "password"}
                className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
                placeholder="Your password"
                onChange={(e)=> setPassword(e.target.value)} value={password}
              />
              {!show ? (
                <FaRegEyeSlash
                  className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <FaEye
                  className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>

            {/* SIGN UP BUTTON */}

            <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" disabled={loading} onClick={handleLogin}>
              {loading?<ClipLoader size={30} color="white"/>:" Login"}
            </button>

            {/*Forgot PASSWORD BUTTON */}
            <span className="text-[13px] cursor-pointer text-[#585757]">
              Forgot your Password ?
            </span>

            {/* SIGN IN WITH GOOGLE BUTTON */}
            <div className="w-[80%] flex items-center gap-2">
              <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
              <div className="">Or continue</div>
              <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
            </div>

            <div className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center">
              <img src={Google} className="w-[25px]" alt="Google" />
              <span className="text-[18px] text-gray-500">oogle</span>
            </div>

            <div className="text-[#6f6f6f]">
              Create new account
              <span
                className="underline underline-offset-1 text-[black] cursor-pointer ml-1"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </span>
            </div>
          </div>

          {/*right div*/}
          <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black]  md:flex items-center justify-center flex-col hidden">
            {/* hidden on small devices */}
            <img src={logo} alt="logo" className="w-[120px] shadow-2xl" />
            <span className="text-2xl text-white">VIRTUAL COURSES</span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
