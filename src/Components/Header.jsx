import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { Shop_Logo } from '../utils/constant';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items || []);
  const userLogged = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) {
      navigate("/profile/");
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogo = () => {
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
          <Link to={userLogged ? "/profile" : "/login"}>
            <button className="mx-8 flex mt-1">
              <FontAwesomeIcon icon={faUser} />
              <p className='text-sm -mt-1'>({userLogged ? "Sign Out" : "Login"})</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
