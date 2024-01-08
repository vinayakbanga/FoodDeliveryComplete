import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { login,clearErrors } from '../../Actions/userAction';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {loading,error,isAuthenticated,user}=useSelector(state=>state.user)
    const navigate = useNavigate();
    // const location=useLocation();

    const dispatch=useDispatch();
// 7:30
    const loginTab=useRef(null);
    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
        
    }

    const[loginEmail,setLoginEmail]=useState("");
    const[loginPassword,setLoginPassword]=useState("")

    // const redirect=location.search?location.search.split("=")[1]:"/account"

    // const redirect= isAdmin ==

    useEffect(() => {
        if (error) {
          if (error instanceof Error) {
            toast.error(` ${error.message}`);
          } else {
            toast.error(` ${error}`);
          }
          
        }
        if (isAuthenticated) {
            if (user && user.role === 'admin') {
                navigate('/admin/orders');
            } else {
                navigate('/orders/me');
            }
        }
        dispatch(clearErrors());
      }, [dispatch, error,navigate,isAuthenticated,user]);


 




  return (
    <Fragment>
        {loading?<Loader/>:(<section className="login bg-zinc-200 flex justify-center items-center min-h-screen ">
    <div className="w-full max-w-sm   ">
        <form action="/login" ref={loginTab} method="POST" className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4  ">
            
                <span className="text-red-500 text-sm "></span>
              
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Email
                </label>
                <input
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="email" placeholder="Enter your email"
                    required
                    value={loginEmail}
                    onChange={(e)=>setLoginEmail(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************"
                    required
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}/>
            </div>
            <Link className="inline-block text-center  w-full mb-3 font-semibold text-sm text-orange-500" to="/password/forgot">
                    Forget Password
                </Link>
            <div className="flex items-center justify-between">
                <button
                    
                    className="bg-orange-500  text-gray-100  font-bold py-2 border-2 px-4 rounded-full hover:bg-gray-100 hover:text-orange-500 hover:border-orange-500 focus:outline-none focus:shadow-outline"
                    type="submit" onClick={loginSubmit}>
                    Log In
                </button>
                <Link className="inline-block align-baseline font-semibold text-sm text-orange-500" to="/register">
                    Don't have account?
                </Link>
            </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy; All rights reserved.
        </p>
    </div>
</section>)}
    </Fragment>
  )
}

export default Login