import axios from "axios"

import {ALL_ITEMS_REQUEST,ALL_ITEMS_SUCCESS,ALL_ITEMS_FAIL,CLEAR_ERRORS} from "../Constants/menuConstant"


export const getItems =()=> async(dispatch)=>{

    try {
        dispatch({type:ALL_ITEMS_REQUEST});

        const {data}= await axios.get("/api/v1/items")

        dispatch({
            type:ALL_ITEMS_SUCCESS,
            payload:data
            })
        
    } catch (error) {
        dispatch({
            type:ALL_ITEMS_FAIL,
            payload: error.respose.data.message,

        })
        
    }

}

//Clearing errors
export const clearErrors =()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}

