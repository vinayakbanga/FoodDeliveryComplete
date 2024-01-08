import React, { useState , useEffect} from 'react';
import CartTile from '../Cart/CartTile';
import { useSelector } from 'react-redux';
import emptyCart from "../../img/empty-cart.png"
import cartimg from"../../img/cart-black.png"
import { useNavigate } from 'react-router-dom';
// import { clearCart } from '../../Actions/cartActions';
const Cart = () => {
  // const dispatch=useDispatch();
  const navigate=useNavigate();


//   const cartItems={
//     "_id":"5eee6671a27a66807cf2bea3",
// "name":"Fleet-o-fish Burger",
//   "image":"burger-2.png",
// "price":"140",
// "type":"non-veg",
// "category":"burger",
// "quantity":"2",
//   }


  const {cartItems}=useSelector((state)=>state.cart)
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
}, [cartItems]); 
// Recalculate when cartItems change

const checkOutHandler=()=>{
  navigate("/login/shipping")

  // dispatch(clearCart());
}


  
  //10:17

  

  return (
    <>
   {cartItems.length === 0?(
    <div className="empty-cart py-16 h-screen flex items-center ">
      <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Cart Empty 😕</h1>
          <p className="text-gray-500 text-lg mb-12">You probably haven't ordered a pizza yet. <br/>
              To order a pizza, go to the main page.</p>
          <img className="w-2/5 mx-auto" src={emptyCart} alt="empty-cart"/>
          <a href="/" className="inline-block px-6 py-2 rounded-full btn-primary text-white font-bold mt-12">Go back</a>
      </div>
   </div>):(<section className="cart py-16 h-screen m-5">

    
        
<div className="order container mx-auto xl:w-1/2 ">
    <div className="flex items-center border-b border-gray-300 pb-4">

        <img src={cartimg} alt="imgcart"/>
        <h1 className="font-bold ml-4 text-2xl">Order summary</h1>
    </div>

    {cartItems && cartItems.map((item)=>(

    <CartTile item={item}/>
    
    ))}
    
     {/* <CartTile item={cartItems}/> */}
     {/* <CartTile/>
     <CartTile/> */}
        
        
 

        
   
    <hr/>
    <div className="text-right py-4 flex flex-col justify-center">
        <div>
            <span className="text-lg font-bold">Total Amount:</span>
            <span className="amount text-2xl font-bold ml-2">₹{totalPrice}</span>
            <br/>
            <button on onClick={checkOutHandler} className='mr-9 border-orange-500 border-2 rounded-full text-white bg-orange-500 px-4 py-1 hover:bg-white hover:text-orange-500'>Checkout</button>
        </div>
       
</div>


</div> 

</section>
)}


</>
    
















// {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
//     {/* <div classNameName='flex  items-center'>
//        <button classNameName='border-2  p-1 bg-black text-white' onClick={handleIncrement}>+</button>
//        <span classNameName='border-2 py-1 px-4 bg-gray-200 text-gray-600'>{count}</span>
//        <button classNameName='border-2  p-1 px-2 bg-black text-white' onClick={handleDecrement}>-</button>
//       </div> */}
//        {/* <% } else { %> */}
//     {/* <div className="empty-cart py-16">
//         <div className="container mx-auto text-center">
//             <h1 className="text-3xl font-bold mb-2">Cart Empty 😕</h1>
//             <p className="text-gray-500 text-lg mb-12">You probably haven't ordered a pizza yet. <br>
//                 To order a pizza, go to the main page.</p>
//             <img className="w-2/5 mx-auto" src="/img/empty-cart.png" alt="empty-cart">
//             <a href="/" className="inline-block px-6 py-2 rounded-full btn-primary text-white font-bold mt-12">Go back</a>
//         </div>*/}







  );
}

export default Cart;
