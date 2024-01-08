import React, { Fragment, useEffect, useState } from "react";
import Metadata from "../Metadata";
import { useParams,Link } from "react-router-dom";


import { getOrderDetails,updateOrder,clearErrors } from "../../Actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader";

import { AccountTree } from "@mui/icons-material";
// import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../Constants/orderConstant";
import { toast } from "react-toastify";
// import { io } from 'socket.io-client';


const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));

    // socket.emit('joinOrderRoom', id);
  };

  const dispatch = useDispatch();
//   const alert = useAlert();

  const [status, setStatus] = useState("");
  // const socket = io('http://localhost:4000/',{transports:['websocket']});

  useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to socket server");
  //   });
  //   socket.on("connect_error", (err) => {
  //     console.log("Socket connection error: ", err);
  //   });
    
  //   socket.on('orderUpdated', (data) => {
  //     if (data.orderId === id) {

  //       setStatus(data.status)
  //         // Update the state or UI based on the new order data
  //         // e.g., setStatus(data.status);
  //     }
  // });
    // socket.emit('joined',`order_${id}`)

    // io.to(`order_${id}`).emit('orderUpdated',{id,status})




    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));

  //   return () => {
  //     socket.off('orderUpdated');
  // };
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
   <Fragment>
    <Metadata title="Process Order" />
    
      <div className="newProductContainer md:h-screen flex ">
        {loading ? (
          <Loader />
        ) : (
          <div
            className="flex flex-col md:flex-row   justify-between w-full px-2 md:px-20 "
          >
            <div className=" flex   border-red-500 flex-col md:my-5 md:px-5 md:pt-6 md:w-1/2">
                <div className="confirmshippingArea ">
                  <h2 className="font-bold text-lg md:text-2xl text-center mb-4  ">Shipping Info</h2>
                  <div className="orderDetailsContainerBox ">
                    <div className="flex gap-2 md:text-lg">
                      <p className="font-bold">Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="flex gap-2 md:text-lg">
                      <p className="font-bold">Phone:</p>
                      <span>
                        {order.shippinginfo && order.shippinginfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex gap-2 md:text-lg">
                      <p className="font-bold">Address:</p>
                      <span >
                        {order.shippinginfo &&
                          `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.state}, ${order.shippinginfo.pinCode}, ${order.shippinginfo.country}`}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-bold text-lg md:text-2xl text-center mb-4  ">Payment</h2>
                  <div className="orderDetailsContainerBox">
                  <div className="flex gap-2 md:text-lg">
                      <p className="font-bold">Status:</p>
                      <p
                        className={ 
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="flex gap-2 md:text-lg">
                      <p className="font-bold">Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <h2 className="font-bold text-lg md:text-2xl text-center mb-4  ">Order Status</h2>
                  <div className="orderDetailsContainerBox">
                  <div className="flex gap-2 md:text-lg">
                      <p className="font-bold">Status:</p>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Complete"
                          ? "text-green-600"
                          : "text-red-600"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                <h2 className="font-bold text-lg md:text-2xl text-center mb-4  ">Your Cart Items:</h2>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product} className="flex gap-2 items-center">
                          <img 
                className=" h-9 w-9  md:w-20 md:h-20 rounded-full"
                src={`https://github.com/vinayakbanga/FoodDelivery/blob/main/src/img/${item.image}?raw=true`}
                alt="Product Phone"/>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            {/* ... */}
            
            <div
             className="md:w-1/2 border-green-500  "
            >
              <form
                className=" my-12 p- md:my-20 md:p-12 bg-white"
                onSubmit={updateOrderSubmitHandler}
              >
                 <h2 className="font-bold text-lg md:text-2xl text-center mb-4  ">Process Order</h2>

                <div className="flex w-full items-center mt-8">
                  <AccountTree className="absolute transform translate-x-4 text-4xl text-gray-600" />
                  <select
                    className="py-4 px-16 w-full border border-gray-400 rounded outline-none"
                    onChange={(e) => setStatus(e.target.value)}
                  >

                       <option value="currentstatus">Select the status</option>
                    
                   
                      <option value="Order Placed">Order Placed</option>
                      <option value="Order Confirmation">Order Confirmation</option>
                      <option value="Preparation">Preparation</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    
                  </select>
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading || status === ""}
                  className="mt-3 border-2  text-orange-500 border-orange-500 py-1 px-4 rounded-full flex items-center  font-semibold hover:bg-orange-500 hover:ease-in hover:text-white transition-colors"
                >
                  Process
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
