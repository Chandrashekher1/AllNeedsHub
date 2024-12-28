import React from 'react'

const PaymentCheckOut = () => {
  return (
    <>
    <div className='shadow-md mx-8'>
        <div>
            <h1 className='font-bold'>Wallets</h1>
            <p className='mt-2 ml-8'>Paytm</p>
            <p className='ml-8'>PhonePay</p>
        </div>

        <div className='mt-4'>
            <h1 className='font-bold'>UPI </h1>
            <button className='mt-2 ml-8'>Add new UPI ID</button>
        </div>

        <div className='mt-4'>
            <h1 className='font-bold'>Pay On Delivery </h1>
            <button className='mt-2 ml-8'>Cash on Delivery</button>
        </div>
        
    </div>
    </>
  )
}

export default PaymentCheckOut