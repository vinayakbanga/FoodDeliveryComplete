// import {ADD_TO_CART} from "../Constants/cartConstant"



// export const cartReducer= (state ={ cartItems:[]},action)=>{


//     switch (action.type) {
//         case ADD_TO_CART:
//             const item=action.payload;

//             const isItemExist= state.cartItems.find(
//                 (i)=>i.item === item.item
                
//             )

//             if(isItemExist){
//                 return{
//                     ...state,
//                     cartItems:state.cartItems.map((i)=>
//                     i.item === isItemExist.item?item:i)
//                 }

//             }
//             else{
//                 return {
//                     ...state,
//                     cartItems:[...state.cartItems,item],
//                 }
//             }
            
            
    
//         default:
//             return state;
//     }
// }
import { ADD_TO_CART,REMOVE_CART_ITEM,CLEAR_CART,SAVE_SHIPPING_INFO,UPDATE_QUANTITY } from "../Constants/cartConstant";

export const cartReducer = (state = { cartItems: [],shippinginfo:{} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // The payload is the updated array of cart items
            return {
                ...state,
                cartItems: action.payload,
            };

            case UPDATE_QUANTITY:

            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === action.payload.itemId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
            case REMOVE_CART_ITEM:
                return{
                    ...state,
                    cartItems:state.cartItems.filter((i)=>i._id !== action.payload)
                }
            case SAVE_SHIPPING_INFO:
                return{
                    ...state,
                    shippinginfo:action.payload
                }
                
    case CLEAR_CART:
        return {
          ...state,
          cartItems: [],
        };
  


        default:
            return state;
    }
};
