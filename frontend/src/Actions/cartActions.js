// import {ADD_TO_CART} from "../Constants/cartConstant"
// import axios from "axios";


// export const addItemsToCart = (id,qty)=> async (dispatch,getState)=>{

// try {

//     const {data}= await axios.get(`/api/v1/item/${id}`);
//      // Retrieve current items in the cart
//      const cartItems = getState().cart.cartItems;

//      const itemExists = cartItems.find(item => item.item === data.item._id);

    

//     dispatch({
//         type:ADD_TO_CART,
//         payload:{
//             item:data.item._id,
//             name:data.item.name,
//             price:data.item.price,
//             image:data.item.image,
//             quantity:qty
            
//         }
//     });




//     localStorage.setItem("cartitmes",JSON.stringify(getState().cart.cartItems))

    
// } catch (error) {
//     alert.error("Error adding item to cart:", error);
    
// }






// }
// import { useDispatch } from "react-redux";
import { ADD_TO_CART,CLEAR_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO,UPDATE_QUANTITY } from "../Constants/cartConstant";
import axios from "axios";


export const addItemsToCart = (id, qty = 1) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/item/${id}`);

        const cartItems = getState().cart.cartItems;
        const itemExists = cartItems.find(item => item._id === data.item._id);

        const newCartItems = itemExists
            ? cartItems.map(item =>
                item._id === data.item._id
                    ? { ...item, quantity: item.quantity + qty }
                    : item
              )
            : [...cartItems, { ...data.item, quantity: qty }];

        dispatch({
            type: ADD_TO_CART,
            payload: newCartItems
        });

        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } catch (error) {
        console.error("Error adding item to cart:", error);
        // Handle the error appropriately
    }
};
export const updateQuantity = (itemId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { itemId, quantity },
});

//remove form crt


export const removeItemsFromCart =(id)=> async(dispatch,getState)=>{

    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id
    })
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

//save shipping info

export const saveShippingInfo = (data)=> async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })
    localStorage.setItem("cartItems", JSON.stringify(data));


    
} 

export const clearCart = () => ({
    type: CLEAR_CART,
  });
