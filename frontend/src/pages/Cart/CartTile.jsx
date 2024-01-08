import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { updateQuantity,removeItemsFromCart } from '../../Actions/cartActions';


const CartTile = ({item}) => {
  //  console.log(item);
   const dispatch = useDispatch();
    const [qty, setqty] = useState(item.quantity);

    const handleIncrement = () => {
      const newQty = qty + 1;
      setqty(newQty);
      dispatch(updateQuantity(item._id, newQty));
  };

  const handleDecrement = () => {
      const newQty = qty > 0 ? qty - 1 : 0;
      setqty(newQty);
      dispatch(updateQuantity(item._id, newQty));
  };
  const deleteCartItems = (id)=>{
    dispatch(removeItemsFromCart(id))

  }




  return (
    <div className="flex  items-center  my-8  justify-between" >
                <div >
                <img className="h-24 w-24" src={`https://github.com/vinayakbanga/FoodDelivery/blob/main/src/img/${item.image}?raw=true`} alt="item"/>
                </div>
                <div className="flex flex-col ml-4 justify-center items-center  text-center">
                    <h1 className="text-sm md:text-base ">{item.name}</h1>
                    <span className="text-gray-700  text-sm text-center ">{item.type}</span>
                    <span className="text-gray-700  text-sm text-center ">₹{item.price}</span>
                    
                </div>
                <div>
                <div className='flex  items-center'>
       <button className='border-2  p-1 bg-black text-white' onClick={handleIncrement}>+</button>
       <span className='border-2 py-1 px-1 md:px-4 bg-gray-200 text-gray-600'>{qty}</span>
       <button className='border-2  p-1 px-2 bg-black text-white' onClick={handleDecrement}>-</button>
      </div>
                </div>
                <div>
                <span className="font-bold text-md md:text-lg">₹{item.price*qty}</span>
                </div>
                <div>
               
                <button className="cancel-item-icon ml-2 border border-red-500 p-1 text-xs rounded-lg hover:bg-red-500 hover:text-white" onClick={()=>deleteCartItems(item._id)}  > Remove</button>
                </div>
            </div>
  )
}

export default CartTile