import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Add this import
import { toast } from 'react-toastify';
import { serverUrl } from '../App';

const ForgetPassword = () => {
    const [step , setStep]=useState(1)
    const navigate=useNavigate();
    const[email,setEmail]=useState("")
    const[otp,setOtp]=useState("")
    const[newpassword,setNewPassword]=useState("")
    const[conPassword,setConPassword]=useState("")
    const[loading , setLoading]=useState(false)

    console.log("Current step:", step, "Loading:", loading);

    // Password validation function
    const validatePassword = (password) => {
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 6;
        
        if (!isLongEnough) {
            return "Password must be at least 6 characters long";
        }
        if (!hasCapitalLetter) {
            return "Password must contain at least one capital letter";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)";
        }
        return null; // Valid password
    };

    {/* step 1 : email form */}

    const sendOtp = async() => {
        setLoading(true)
        try {
            const res = await axios.post(serverUrl + "/api/auth/sendOTP", {email}, {withCredentials:true})
            console.log("API Success:", res.data) // Add this
            console.log("Setting step to 2") // Add this
            setLoading(false)
            setStep(2)
            toast.success(res.data.message)
        } catch(error) {
            console.log("API Error:", error) // Check if this is executing instead
            toast.error(error.response?.data?.message || "Failed to send OTP")
            setLoading(false)
        }
    }

    //step 2 
    const verifyOTP = async ()=>{
        setLoading(true)
        try{
            const result = await axios.post(serverUrl+"/api/auth/verifyOTP", {email, otp} , {withCredentials:true})
            console.log(result.data)
            setLoading(false)
            setStep(3)
            toast.success(result.data.message)
        }catch(error){
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to verify OTP")
            setLoading(false)
        }
    }

    //step 3 
    const resetPassword = async () => {
        if (!newpassword || !conPassword) {
            return toast.error("Please fill in both password fields");
        }
        
        // Validate password format
        const passwordError = validatePassword(newpassword);
        if (passwordError) {
            return toast.error(passwordError);
        }
        
        if (newpassword !== conPassword) {
            return toast.error("Passwords do not match");
        }
        
        console.log("Sending data:", { email, password: newpassword }); // Debug
        
        setLoading(true);
        try {
            const result = await axios.post(serverUrl + "/api/auth/resetpassword", 
                {
                    email: email,        // Make sure email is not undefined
                    password: newpassword // Make sure password is not undefined
                }, 
                {withCredentials: true}
            );
            console.log(result.data);
            setLoading(false);
            navigate("/login");
            toast.success(result.data.message);
        } catch(error) {
            console.log("Reset password error:", error);
            console.log("Email:", email, "Password:", newpassword); // Debug values
            toast.error(error.response?.data?.message || "Reset password failed");
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>

            {/* step 1 ----------------------------------- */}
            { step==1 &&  <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forgot Your Password</h2>
                <form className='space-y-4' onSubmit={(e)=>{
                    e.preventDefault()
                }}>
                    <div> 
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Enter your email address</label>
                        <input id='email' type='email' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder="you@example.com" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                    </div>

                    <button className='w-full bg-black hover:bg-gray-700 text-white p-2 px-4 rounded-md font-medium cursor-pointer disabled:opacity-50' disabled={loading} onClick={sendOtp}> {loading ? <ClipLoader size={20} color='white'/>:"Send OTP"}</button>
                </form>
                <div className='text-sm text-center mt-4 cursor-pointer hover:underline' onClick={()=>navigate("/login")} >Back to Login </div>
            </div> }

            {/* step 2  sending OTP ----------------------------------------*/}
            { step==2 &&  <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>
                <form className='space-y-4'onSubmit={(e)=>{
                    e.preventDefault()}}>
                    <div> 
                        <label htmlFor='otp' className='block text-sm font-medium text-gray-700'>Please enter the 4 digit code sent to your email.</label>
                        <input id='otp' type='text' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-center text-lg tracking-widest' placeholder="* * * *" onChange={(e)=>setOtp(e.target.value)} value={otp} maxLength={4} required/>
                    </div>

                    <button className='w-full bg-black hover:bg-gray-700 text-white p-2 px-4 rounded-md font-medium cursor-pointer disabled:opacity-50' disabled={loading} onClick={verifyOTP}> {loading ? <ClipLoader size={20} color='white'/>:" Verify OTP"}</button>
                </form>
                <div className='text-sm text-center mt-4 cursor-pointer hover:underline' onClick={()=>navigate("/login")} >Back to Login </div>
            </div> }
 
            {/* step 3  input for new password-----------------------------------------  */}
            { step==3 &&   <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
                <p className='text-sm text-gray-500 text-center mb-4'>Enter a password below to regain access to your account.</p>
                
                {/* Password Instructions */}
                <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md'>
                    <h3 className='text-sm font-medium text-blue-800 mb-2'>Password Requirements:</h3>
                    <ul className='text-xs text-blue-700 space-y-1'>
                        <li>• At least 6 characters long</li>
                        <li>• Must contain at least one capital letter (A-Z)</li>
                        <li>• Must contain at least one special character (!@#$%^&*)</li>
                    </ul>
                    <p className='text-xs text-blue-600 mt-2 font-medium'>Example: MyPass@123</p>
                </div>
                
                <form className='space-y-4' onSubmit={(e)=>{
                    e.preventDefault()}}>
                    <div> 
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                            New Password
                        </label>
                        <input id='password' type='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder="Enter new password" required onChange={(e)=>setNewPassword(e.target.value)} value={newpassword}/>
                    </div>

                     <div> 
                        <label htmlFor='conpassword' className='block text-sm font-medium text-gray-700'>
                            Confirm Password
                        </label>
                        <input id='conpassword' type='password' className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black' placeholder="Confirm new password" required onChange={(e)=>setConPassword(e.target.value)} value={conPassword}/>
                    </div>

                    <button className='w-full bg-black hover:bg-gray-700 text-white p-2 px-4 rounded-md font-medium cursor-pointer disabled:opacity-50' disabled={loading} onClick={resetPassword}> {loading ? <ClipLoader size={20} color='white'/>:"Reset Password"}  </button>
                </form>
                <div className='text-sm text-center mt-4 cursor-pointer hover:underline' onClick={()=>navigate("/login")} >Back to Login </div>
            </div> }

        </div>
    )
}

export default ForgetPassword
