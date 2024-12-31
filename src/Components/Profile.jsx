import { signOut } from 'firebase/auth';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebase';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const LoggedUser = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth)
              .then(() => {
                dispatch(removeUser());
              })
              .catch((error) => {
                console.error("Error during sign out:", error);
            });
            navigate("/")
    }
    
  return (
    <div className='border shadow-md mx-8 my-8'>
        <h2 className='text-center font-bold text-2xl text-green-500'>Profile</h2>

        
        <div className='flex mt-4 ml-4'>
            <h3 className='font-semibold text-lg'>Name :  </h3>
            <span className='ml-2 mt-1'>{LoggedUser.displayName}</span>
        </div>
        <div className='flex ml-4 mt-2'>
            <h3 className='font-semibold text-lg'>Phone No :  </h3>
            <span className='ml-2 '>{LoggedUser.phoneNumber}</span>
        </div>
        <div className='flex ml-4 mt-2'>
            <h3 className='font-semibold text-lg'>Email :  </h3>
            <span className='ml-2 '>{LoggedUser.email}</span>
        </div>

        <button className='font-bold text-white bg-red-600 p-2 rounded-lg mx-24 my-8 cursor-pointer active:bg-red-500' onClick={handleSignOut}>Sign Out</button>

    </div>
  )
}

export default Profile