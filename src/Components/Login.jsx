import React, { useRef, useState } from 'react'
import useOnlineStatus from '../Hooks/useOnlineStatus'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkValidateData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { addUser } from '../utils/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const [signUp, setSignUp] = useState(false)
  const [message,setMessage] = useState('')
  const dispatch = useDispatch()
  const phone = useRef()
  const password = useRef(null)
  const email = useRef(null)
  const name = useRef(null)
  // console.log(phone);
  

  const handleSignUp = (e) => {
    setSignUp(!signUp)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // navigate("/")
    const message = checkValidateData(email.current?.value,phone.current?.value,password.current?.value)
    setMessage(message)

    if(message) return

    // Sign In & Sign Up
    
    if(signUp){
      // signUp logic

      createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value,phone.current?.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value
            
          }).then(() => {
            const { uid, displayName, phoneNumber, email } = auth.currentUser;
            dispatch(addUser({ uid:uid, email:email, displayName:displayName, phoneNumber:phoneNumber }));
            navigate("/")

          }).catch((error) => {
            // An error occurred
            // ...
          });
          
        })
        .catch((error) => {
          
          setMessage("Please Enter Valid Email ")
        });
    }
    else{
      // Sign In logic

      signInWithEmailAndPassword(auth, email.current?.value, password.current?.value,phone.current?.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/")
      })
      .catch((error) => {
        setMessage("Please enter Sign Up Email")
      });
    }

  }
  const onlineStatus = useOnlineStatus()

    return !onlineStatus ? <h1>Looks like you're offline! Please check your internet connection.</h1> : (
    <div className='mx-4 border bg-gray-100'>
      <h3 className='text-center font-bold text-3xl'>{signUp ? "Sign Up" : "Sign In"}</h3>

      <div>
        <form action="" className='flex flex-col my-6' onSubmit={handleSubmit}>
          {signUp && <label htmlFor="name" className='mx-4 font-semibold' >Full Name: </label>}
          {signUp && <input type="text" 
          id='name'
          required
          ref={name}
          placeholder='Enter your name '
          className='border border-black rounded-sm  mx-4 my-2 p-2 outline-none'  
           />}
          <label htmlFor="mobile" className='mx-4 font-semibold' > Mobile No :</label>
          <input type="text"
          inputMode='numeric' 
          id='mobile'
          required
          ref={phone}
          maxLength={10}
          placeholder='Mobile Number'
          className='border border-black rounded-sm mx-4 my-2 p-2 outline-none' 
           />
           <label htmlFor="pass" className='mx-4 font-semibold'mx-4>Password: </label>
          <input type="text" 
          id='pass'
          required
          ref={password}
          placeholder='Password'
          className='border border-black mx-4 rounded-sm p-2 outline-none' 
           />
            <label htmlFor="email" className='mx-4 font-semibold'mx-4 id='pass'>Email: </label>
            <input type="email" 
          id='email'
          required
          ref={email}
          placeholder='Email'
          className='border border-black mx-4 rounded-sm p-2 outline-none' 
           />
           <p className='mx-4 my-2 text-red-600 font-semibold'>{message}</p>
           <button className='bg-red-700 rounded-lg p-2 mx-8 my-4 font-bold text-white active:bg-red-500'  >Continue</button>
        </form>
        <h2 className='text-red-600 mx-2 my-2 font-semibold underline'>Forgot Password</h2>
        <h1 className='text-center font-semibold text-2xl '>OR</h1>
        <button className='text-lg mx-2 underline' onClick={handleSignUp}>{signUp ? "Sign In" : "Create An account"}</button>
      </div>

    </div>
  )
}

export default Login