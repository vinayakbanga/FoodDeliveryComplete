import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import Metadata from '../Metadata';
import { useNavigate } from 'react-router-dom';
// import { h2 } from '@mui/material';

const ConfirmOrder = () => {
  const { shippinginfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate=useNavigate()
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.05;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippinginfo.address}, ${shippinginfo.city}, ${shippinginfo.state}, ${shippinginfo.pinCode}, ${shippinginfo.country}`;


  const proceedToPayment = () => {
      const data = {
        subtotal,
        shippingCharges,
        tax,
        totalPrice,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
      navigate("/process/payment")
  
    //   history.push("/process/payment");
    //11;09
    
    };

  return (
    <Fragment>
      <Metadata title="Confirm Order" />
      <br/>
      <CheckoutSteps activeStep={1}  />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 h-screen bg-white">
        <div className="col-span-2 md:col-span-2 lg:col-span-4 p-10 border-r border-gray-300">
          <div>
            <h2 className="text-xl md:text-3xl mb-5 font-bold">Shipping Info</h2>
            <div className="mb-5 flex gap-3">
              <p className="font-semibold">Name:</p>
              <span>{user.name}</span>
            </div>
            <div className="mb-5 flex gap-3">
              <p className="font-semibold">Phone:</p>
              <span>{shippinginfo.phoneNo}</span>
            </div>
            <div className="mb-5 flex gap-3">
              <p className="font-semibold">Address:</p>
              <span>{address}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl mb-5 font-bold">Your Cart Items:</h2>
            <div>
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-4">
                  <img src={`https://github.com/vinayakbanga/FoodDelivery/blob/main/src/img/${item.image}?raw=true`} alt="Product" className="w-12 h-12 object-cover" />
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-2 p-10">
          <div className="mb-5">
            <h2 className="text-center text-xl font-medium mb-5">Order Summary</h2>
            <div className="mb-5 flex gap-3 justify-between">
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div className="mb-5 flex gap-3 justify-between">
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div className="mb-5 flex gap-3 justify-between">
              <p>GST:</p>
              <span>₹{tax}</span>
            </div>
            <div className="border-t pt-5 flex justify-between">
              <p className="font-semibold">Total:</p>
              <span className='font-bold'>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment} className="w-full bg-orange-500 text-white py-2 mt-5 hover:bg-orange-600 transition duration-300">Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;





