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
        <ul className='mx-auto'>
            <SocialIcons/>

            <li className='font-semibold text-2xl text-center my-8 underline'>Maps</li>

            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2771358256023!2d77.1402501!3d28.471199400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f79ea6b8cef%3A0x685cdd68215ac6f9!2sChandu%20General%20Store!5e0!3m2!1sen!2sin!4v1735485541241!5m2!1sen!2sin"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="mx-auto w-80  rounded-md md:w-full h-60"
              ></iframe>
            </div>

          </ul>
        </div>
        <h1 className='text-center font-semibold text-xl mt-4'>@2025 All Rights</h1>
        
    </div>
  )
}

export default Footer