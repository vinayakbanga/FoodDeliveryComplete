import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Metadata";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Loader from "../../Components/Loader";
import { getOrderDetails, clearErrors } from "../../Actions/orderAction";
import { toast } from "react-toastify";
// import { io } from 'socket.io-client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// faBox

import { faBox, faCheckCircle, faTruckMoving, faUtensils, faHome } from '@fortawesome/free-solid-svg-icons';

import socket from "../../Components/Socket";





const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  // const{deliveredAt}= useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const [status, updatedStatus] = useState(order?.orderStatus);


  const orderStages = [
    { name: "Order Placed", key: "Order Placed", icon: faBox },
    { name: "Order Confirmation", key: "Order Confirmation", icon: faCheckCircle },
    { name: "Preparation", key: "Preparation", icon: faUtensils },
    { name: "Out For Delivery", key: "Out for delivery", icon: faTruckMoving },
    { name: "Delivered", key: "Delivered", icon: faHome }
  ];
  
  const getStatusStyle = (stageKey, currentStatus) => {
    let indexCurrent = orderStages.findIndex(stage => stage.key === currentStatus);
    let indexStage = orderStages.findIndex(stage => stage.key === stageKey);
  
    return indexStage <= indexCurrent ? "text-orange-500" : "text-gray-400";
  };
  
  // const socket = io('http://localhost:4000/',{transports:['websocket']});
  

  
  
  
  
  
  useEffect(() => {
    if(order){

      socket.emit('joinOrderRoom', id);
    }

    
    // const socket = io('http://localhost:4000/',{transports:['websocket']}); // URL of your Socket.IO server
    

    // socket.emit('joinOrderRoom', id);
    // socket.on("connect", () => {
    //   console.log("Connected to socket server");
    //   // socket.emit('joined',`order_${id}`)
    // });

    // socket.on("connect_error", (err) => {
    //   console.log("Socket connection error: ", err);
    // });
    
    socket.on('orderUpdated', (data) => {
      updatedStatus(data.status)
      // toast.success("Status Update")
      // if (data.orderId === id) {
      //     // Update your state or UI
      //     // order.orderStatus=data.status
      //     // e.g., setOrderStatus(data.status);
      // }
  });
  


    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
    
    

   


    return () => {
      socket.off('joinOrderRoom');
      console.log("off");
      // socket.off('orderUpdated'); // Turn off any other event listeners
    };


  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Order Details" />
          <div className="bg-white py-10 h-screen"> {/* orderDetailsPage */}
            <div className="p-10"> {/* orderDetailsContainer */}
              <Typography component="h1" className="text-3xl font-light text-tomato my-4">
                Order #{order && order._id}
              </Typography>
              <Typography className="text-xl font-medium">Shipping Info</Typography>
              <div className="my-2"> {/* orderDetailsContainerBox */}
                <div className="flex my-1">
                  <p>Name:</p>
                  <span className="mx-2 text-sm font-light text-gray-700">{order.user && order.user.name}</span>
                </div>
                <div className="flex my-1">
                  <p>Phone:</p>
                  <span className="mx-2 text-sm font-light text-gray-700">
                    {order.shippinginfo && order.shippinginfo.phoneNo}
                  </span>
                </div>
                <div className="flex my-1">
                  <p>Address:</p>
                  <span className="mx-2 text-sm font-light text-gray-700">
                    {order.shippinginfo &&
                      `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.state}, ${order.shippinginfo.pinCode}, ${order.shippinginfo.country}`}
                  </span>
                </div>
              </div>
              <Typography className="text-xl font-medium">Payment</Typography>
              <div className="my-2"> {/* orderDetailsContainerBox */}
                <div>
                  <p className={`text-sm ${order.paymentInfo && order.paymentInfo.status === "succeeded" ? "text-green-500" : "text-red-500"}`}>
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              {/* <Typography className="text-xl font-medium">Order Status</Typography> */}
              {/* <div className="my-2"> orderDetailsContainerBox */}
                {/* <div> */}
                  {/* <p className={`text-sm ${order.orderStatus && order.orderStatus === "Delivered" ? "text-green-500" : "text-red-500"}`}> */}
                    {/* {status} */}
                  {/* </p> */}
                 
                {/* </div> */}
              {/* </div> */}
              <Typography className="text-xl font-medium">Order Timeline</Typography>
              <div className="flex justify-between items-center my-4"> {/* Timeline Container */}
  {orderStages.map((stage, index) => (
    <Fragment key={index}>
      <div className="flex flex-col items-center"> {/* Icon and Label Container */}
        <FontAwesomeIcon
          icon={stage.icon}
          className={`h-8 w-8 ${getStatusStyle(stage.key, status)}`}
          // Adjust size and other styles as needed
        />
        <p className={`text-xs mt-2 ${getStatusStyle(stage.key, status)}`}>{stage.name}</p>
      </div>
      {index < orderStages.length - 1 && (
        <div
          className={`flex-grow border-t-2 ${index < orderStages.findIndex(stage => stage.key === status) ? "border-orange-500" : "border-gray-300"}`}
          style={{ height: "2px", margin: "0 8px" }}
        ></div>
      )}
    </Fragment>
  ))}
</div>
            </div>

            <div className="py-2 px-10 border-t border-gray-300"> {/* orderDetailsCartItems */}
              <Typography className="text-xl font-medium">Order Items:</Typography>
              <div className="my-2"> {/* orderDetailsCartItemsContainer */}
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex items-center my-2 text-sm font-medium">
                      <img className="h-24 w-24" src={`https://github.com/vinayakbanga/FoodDelivery/blob/main/src/img/${item.image}?raw=true`} alt="item" />
                      <Link to={`/product/${item.product}`} className="text-gray-700 mx-4">
                        {item.name}
                      </Link>
                      <span>
                        {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
