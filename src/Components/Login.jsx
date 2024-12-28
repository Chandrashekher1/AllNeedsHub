import React, { useState } from 'react'
import useOnlineStatus from '../Hooks/useOnlineStatus'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [signUp, setSignUp] = useState(false)
  const handleSignUp = (e) => {
    setSignUp(!signUp)
  }

  const handleContinue = () => {
    navigate("/")
  }

  const onlineStatus = useOnlineStatus()

    return !onlineStatus ? <h1>Looks like you're offline! Please check your internet connection.</h1> : (
    <div className='mx-4 border bg-gray-100'>
      <h3 className='text-center font-bold text-3xl'>{signUp ? "Sign Up" : "Sign In"}</h3>

      <div>
        <form action="" className='flex flex-col my-6' onSubmit={(e) => e.preventDefault()}>
          {signUp && <label htmlFor="name" className='mx-4 font-semibold' >Full Name: </label>}
          {signUp && <input type="text" 
          id='name'
          required
          placeholder='Enter your name '
          className='border border-black rounded-sm  mx-4 my-2 p-2 outline-none'  
           />}
          <label htmlFor="mobile" className='mx-4 font-semibold' > Mobile No :</label>
          <input type="number" 
          id='mobile'
          required
          placeholder='Mobile Number'
          className='border border-black rounded-sm mx-4 my-2 p-2 outline-none' 
           />
           <label htmlFor="pass" className='mx-4 font-semibold'mx-4>Password: </label>
          <input type="text" 
          id='pass'
          required
          placeholder='Password'
          className='border border-black mx-4 rounded-sm p-2 outline-none' 
           />
           {signUp && <label htmlFor="email" className='mx-4 font-semibold'mx-4 id='pass'>Email: </label>}
          {signUp && <input type="email" 
          id='email'
          required
          placeholder='Email'
          className='border border-black mx-4 rounded-sm p-2 outline-none' 
           />}
           <button className='bg-red-700 rounded-lg p-2 mx-8 my-4 font-bold text-white active:bg-red-500'  onClick={handleContinue}>Continue</button>
        </form>
        <h2 className='text-red-600 mx-2 my-2 font-semibold underline'>Forgot Password</h2>
        <h1 className='text-center font-semibold text-2xl '>OR</h1>
        <button className='text-lg mx-2 underline' onClick={handleSignUp}>{signUp ? "Sign In" : "Create An account"}</button>
      </div>

    </div>
  )
}

export default Login