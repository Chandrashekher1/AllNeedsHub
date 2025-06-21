import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SearchItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items || []);
  const totalRate = cartItems.reduce((sum, item) => sum + (item?.rate || 0), 0);
  const location = useLocation()
  const items = location.state?.items || [];

  console.log(items);
  
  const handleAddItem = (item) => {
    dispatch(addItems(item));
  };

  const handleCart = () => {
    navigate("/cart");
  };

  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No items found.</p>;
  }

  return (
    <>
      <div className="flex flex-wrap ml-10 md:mx-40">
        {items?.map((item) => (
          <div key={item.id} className="border m-2 md:mx-4 md:p-2 w-32 md:w-40 rounded-lg text-center">
            <img
              src={item.cloudinaryImageId}
              alt="Image_Product"
              className="w-28 md:w-40 p-2 mx-2"
            />
            <h3 className="font-semibold">{item.name}</h3>
            <h4 className="font-bold my-2">₹{item.rate}</h4>
            <p className="text-gray-600">{item.weigth} - {item.cuisines || ""}</p>
            <button
              className="border cursor-pointer border-green-500 rounded-lg font-semibold text-green-700 my-4 p-2 active:scale-90 hover:bg-green-100"
              onClick={() => handleAddItem(item)}
            >
              ADD ME
            </button>
          </div>
        ))}

      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-3 right-4 bg-green-700 text-white flex items-center justify-between rounded-xl px-4 py-1 m-2 shadow-lg z-50">
          <div className="font-semibold">
            <p>{cartItems.length} Items</p>
            <p>₹{totalRate}</p>
          </div>
          <button className="font-semibold focus:outline-none" onClick={handleCart}>
            View Cart <span className="text-white font-extrabold">{"->"}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default SearchItems;
