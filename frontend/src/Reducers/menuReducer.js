import {ALL_ITEMS_REQUEST,ALL_ITEMS_SUCCESS,ALL_ITEMS_FAIL,CLEAR_ERRORS} from "../Constants/menuConstant"

export const menuReducer=(state={items:[]},action)=>{
    switch (action.type) {
        case ALL_ITEMS_REQUEST:
            
        return{
            loading:true,
            items:[]
        }
        case ALL_ITEMS_SUCCESS:
            
        return{
            loading:false,
            items:action.payload.items,
            itemsCount:action.payload.itemCount
        }
        case ALL_ITEMS_FAIL:
            
        return{
            loading:false,
            error:action.payload
        }

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null

            }
            
            
            
    
        default:
            return state;
    }

}