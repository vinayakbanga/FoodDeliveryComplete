import React, { Fragment } from 'react'

import Header from './Header'
import MenuSec from './MenuSec'
import Metadata from '../Metadata'
import { getItems } from '../../Actions/menuAction'
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from 'react'
import Loader from '../../Components/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {addItemsToCart} from "../../Actions/cartActions"


const Home = () => {

  const dispatch =useDispatch();
  const {loading,error,items,itemsCount}=useSelector(state=>state.items)


  useEffect(() => {
    if (error) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error(`An error occurred: ${error}`);
      }
    }
    dispatch(getItems());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading? (<Loader/>):(<>
    <Metadata title="HomePage" />
    
    <Header></Header>
    <MenuSec items={items}/>
    </>)}
    </Fragment>
    
  )
}

export default Home