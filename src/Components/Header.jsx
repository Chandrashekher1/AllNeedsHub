import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { Shop_Logo } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { removeUser } from '../utils/userSlice';

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items || []);
  const navigate = useNavigate();

  // State for login/logout toggle
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch()

  // Handle login/logout toggle
  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);

      signOut(auth).then(() => {
        dispatch(removeUser())
      }).catch((error) => {
        // An error happened.
      });
  };

  const handleLogo = (e) => {
    navigate("/");
  };

  return (
    <div className="flex justify-between p-1 sticky top-1 bg-white shadow-md">
      <div>
        <img
          className="w-20 h-12 cursor-pointer object-contain"
          src={Shop_Logo}
          alt="logo"
          onClick={handleLogo}
        />
      </div>

      <div className="flex p-2 cursor-pointer ml-12">
        <Link to="/">
          <h3 className="mx-6 font-bold text-lg">
            <FontAwesomeIcon icon={faHouse} />
          </h3>
        </Link>
        <Link to="/cart">
          <h3 className="ml-6 mt-1 text-lg flex">
            <FontAwesomeIcon icon={faBagShopping} />
            <span className="-mt-1 text-red-700 font-semibold">({cartItems.length})</span>
          </h3>
        </Link>
        <div>
         <Link to="/login">
         <button
            className="mx-8 flex mt-1"
            onClick={handleAuthToggle}
          >
            <FontAwesomeIcon icon={faUser} />
            <span className=' text-xs'>{isLoggedIn ? " Sign Out" : " Login"}</span>
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
