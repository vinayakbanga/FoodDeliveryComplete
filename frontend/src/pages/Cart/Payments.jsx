import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Metadata";
// import {  } from "@material-ui/core";
// Typography
// import { useAlert } from "react-alert";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// CardNumberElement

import axios from "axios";
// import "./payment.css";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// CreditCard
// import EventIcon from "@material-ui/icons/Event";
// Event
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import { createOrder, clearErrors } from "../../actions/orderAction";
import { Typography } from "@mui/material";
import { CreditCard, Event,VpnKey } from "@mui/icons-material";
import { CardNumberElement,CardCvcElement,CardExpiryElement ,useStripe,useElements} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearErrors,createOrder } from "../../Actions/orderAction";
// clearErrors
const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate=useNavigate()
  const dispatch = useDispatch();
//   const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippinginfo,cartItems } = useSelector((state) => state.cart);
//   const {_id,name,price,image,quantity}=useSelector((state)=>state.cart.cartItems)
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const transformedOrderItems = cartItems.map(item => ({
    name: item.name,
    price: Number(item.price), // Ensure price is a number
    quantity: item.quantity,
    image: item.image,
    product: item._id // Assign the _id from the cart item to product
}));


  const order = {
    shippinginfo,
    orderItems: transformedOrderItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippinginfo.address,
              city: shippinginfo.city,
              state: shippinginfo.state,
              postal_code: shippinginfo.pinCode,
              country: shippinginfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            
          };
          console.log(order);

          dispatch(createOrder(order));
        toast.success("Order placed")

          navigate("/orders/me");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
  <Metadata title="Payment" />
  <CheckoutSteps activeStep={2} />
  <div className="bg-zinc-200 flex justify-center items-center min-h-screen   ">
    <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 m-6 w-full md:w-1/4 " onSubmit={(e) => submitHandler(e)}>
      <h2 className="text-center font-light border-b-2 pb-2 text-lg md:text-3xl  mb-5">
        Card Info
      </h2>
      <div className="flex items-center gap-2 mb-5">
        <CreditCard />
        <CardNumberElement className="p-[1vmax] pr-[1vmax] w-full box-border border border-black border-opacity-27 rounded" />
      </div>
      <div className="flex items-center gap-2 mb-5">
        <Event />
        <CardExpiryElement className="p-[1vmax] pr-[1vmax] w-full box-border border border-black border-opacity-27 rounded" />
      </div>
      <div className="flex items-center gap-2 mb-5">
        <VpnKey />
        <CardCvcElement className="p-[1vmax] pr-[1vmax] w-full box-border border border-black border-opacity-27 rounded" />
      </div>
      <div className="text-center">

      <input
        type="submit"
        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
        ref={payBtn}
        className="  bg-orange-500  text-gray-100  font-bold py-2 border-2 px-4 rounded-full hover:bg-gray-100 hover:text-orange-500 hover:border-orange-500 focus:outline-none focus:shadow-outline "
      />
      </div>
    </form>
  </div>
</Fragment>

  );
};

export default Payment;
