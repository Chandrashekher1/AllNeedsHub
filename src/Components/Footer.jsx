import React from 'react'
import SocialIcons from './SocialIcons'

const Footer = () => {
  return (
    <div className='w-full bg-gray-200'>
        <div>
          <h2 className='font-semibold text-xl text-center'>Useful Links</h2>
          <li className='flex flex-wrap'>
          <div className='my-4'>
          <p className='mx-4'>About</p>
          <p className='mx-4'>Careers</p>
          </div>
          <div className='my-4 mx-4'>
          <p className='mx-4'>Privacy</p>
          <p className='mx-4'>Terms</p>
          <p className='mx-4'>FAQs</p>
          <p className='mx-4'>Security</p>
          </div>
          <div className='my-4 mx-2'>
          <p className='mx-4'> Mobile</p>
          <p className='mx-4'>Contact</p>
          </div>
          </li>
        </div>
        <div>
        <h2 className='font-semibold text-xl text-center mt-4'>Social Links</h2>
        <ul className=' '>
            <SocialIcons/>
            <li></li>
          </ul>
        </div>
    </div>
  )
}

export default Footer