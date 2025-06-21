import React from 'react';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-white px-4 py-8">
      {/* Useful Links */}
      <div className="mb-8">
        <h2 className="font-semibold text-xl text-center mb-4">Useful Links</h2>
        <ul className="flex flex-col md:flex-row justify-center items-start gap-8 text-center md:text-left">
          <li>
            <p>About</p>
            <p>Careers</p>
          </li>
          <li>
            <p>Privacy</p>
            <p>Terms</p>
            <p>FAQs</p>
            <p>Security</p>
          </li>
          <li>
            <p>Mobile</p>
            <p>Contact</p>
          </li>
        </ul>
      </div>

      {/* Social Links and Map */}
      <div className="mb-8">
        <h2 className="font-semibold text-xl text-center mb-4">Social Links</h2>
        <div className="flex flex-col items-center">
          <SocialIcons />
          {/* <h3 className="font-semibold text-2xl underline my-4">Maps</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2771358256023!2d77.1402501!3d28.471199400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f79ea6b8cef%3A0x685cdd68215ac6f9!2sChandu%20General%20Store!5e0!3m2!1sen!2sin!4v1735485541241!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full md:w-[600px] h-60 rounded-md"
          ></iframe> */}
        </div>
      </div>

      {/* Footer Note */}
      <h1 className="text-center font-semibold text-xl">@2025 All Rights Reserved</h1>
    </div>
  );
};

export default Footer;
