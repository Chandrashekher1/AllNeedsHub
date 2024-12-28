import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector((store) => store.cart.items || []);
  const totalRate = cartItems.reduce((sum, item) => sum + (item?.rate || 0), 0);
  const navigate = useNavigate();
  
  const handlePayment = () => {
    navigate("/payment/");
  };

  return (
    <>
      <div className="overflow-y-auto max-h-screen pb-20">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item?.id} className="border m-4 flex">
              <img
                src={item?.cloudinaryImageId}
                alt=""
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="text-wrap text-sm">{item?.name || 'No name'}</h2>
                <p className="text-gray-500 mt-2">{item?.weight}</p>
                <p className="mt-2 font-bold">₹ {item?.rate || 'No Price'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="font-bold m-4 text-red-700 text-xl text-center">OOPS!! Your cart is empty. Please Add Some Items</p>
        )}
        {cartItems.length > 0 && <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="font-bold">Bill Details</h2>
          <p className="flex justify-between font-medium mt-2">
            Items total <span>₹ {totalRate}</span>
          </p>
          <p className="flex justify-between font-medium">
            Delivery Charge <span>₹ 0</span>
          </p>
          <p className="flex justify-between font-bold mt-4">
            Grand Total <span>₹ {totalRate}</span>
          </p>
        </div>}
        {cartItems.length >0 && <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h1 className="font-bold">Cancellation Policy</h1>
          <p className="mt-4 text-gray-600">
            Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
          </p>
        </div>}
      </div>

      {cartItems.length > 0 && <div className="fixed bottom-4 left-1 right-2 bg-green-700 text-white flex items-center justify-between rounded-xl px-4 py-1 m-2 shadow-lg z-50">
        <button
          className="font-semibold p-3 ml-8 bg-green-700 rounded-lg"
          onClick={handlePayment}
        >
          Add Payment Method {">"}
        </button>
      </div>}

    </>
  );
};

export default Checkout;
