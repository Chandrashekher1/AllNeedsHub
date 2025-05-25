import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils/cartSlice";

const ItemsMenu = () => {
  const collectionName  = useLocation(); 
  console.log(collectionName.pathname);
  
  const [itemsMenu, setItemsMenu] = useState([]);
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items || []);
  const totalRate = cartItems.reduce((sum, item) => sum + (item?.rate || 0), 0);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://cpstore-backend.onrender.com/api/product${collectionName.pathname}`);
      const json = await response.json();
      console.log(json);
      
      const menuData = json?.data?.cards || [];
      // const selectedItem = menuData.find((item) => item.id === collectionName);
      setItemsMenu(json);
      // console.log(selectedItem);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!onlineStatus) {
    return <h1>Looks like you're offline! Please check your internet connection.</h1>;
  }

  if (itemsMenu.length === 0) {
    return <Shimmer />;
  }

  const handleAddItem = (item) => {
    dispatch(addItems(item))
  }

  const handleCart = () => {
    navigate("/cart")
  }

  return (
    <>
    <div className="flex flex-wrap ml-10 md:mx-40">
      {itemsMenu.map((item) => (
        <div key={item._id} className="border m-2 md:mx-4 md:p-2 w-32 md:w-40 rounded-lg text-center">
          <img
            src={item.images[0]}
            alt="Image_Product"
            className="w-28 md:w-40 p-2 mx-2"
          />
          <h3 className="font-semibold">{item.name}</h3>
          <h4 className="font-bold my-2">₹{item.price}</h4>
          <p className="text-gray-600">
            {item.weigth} - {item.description || ""}
          </p>
          <button className="border cursor-pointer border-green-500 rounded-lg font-semibold text-green-700 my-4 p-2 active:scale-90 hover:bg-green-100" onClick={() => handleAddItem(item)}>
            ADD ME
          </button>
        </div>
      ))}
    </div>

    {cartItems.length > 0 && <div className="fixed bottom-4 left-3 right-4 bg-green-700 text-white flex items-center justify-between rounded-xl px-4 py-1 m-2 shadow-lg z-50">
          <div className="font-semibold">
            <p>{cartItems.length} Items</p>
            <p>₹{totalRate}</p>
          </div>
          <button
            className="font-semibold focus:outline-none"
            onClick={handleCart}
          >
            View Cart <span className="text-white font-extrabold">{"->"}</span>
          </button>
        </div>}
      
    
    </>
  );
};

export default ItemsMenu;
