import React, { useRef, useState,useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { register,clearErrors } from '../../Actions/userAction'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate()
    const {loading,error,isAuthenticated}=useSelector(state=>state.user)
const dispatch=useDispatch();
 const registerTab= useRef("null")

 const [user,setUser] = useState({

    name:"",
    email:"",
    password:""
 });

 const {username,email,password}=user;

//  const [avatar,setAvatar]= useState()
//  const [avatarPreview,setAvatarPreview]= useState("../../img/logo.png")
const registerDataChange=(e)=>{
    
        

    
    setUser({...user,[e.target.name]:e.target.value});
    // console.log(user);


}
 const registerSub=(e)=>{
    e.preventDefault();
    // console.log(user);

    const myForm= new FormData();

    myForm.append("name",user.name);
    myForm.append("email",user.email);
    myForm.append("password",user.password);
    // myForm.set("avatar",avatar);
    dispatch(register(user))

    // console.log(myForm);
    

 }

 
 useEffect(() => {
    if (error) {
      if (error instanceof Error) {
        toast.error(` ${error.message}`);
      } else {
        toast.error(` ${error}`);
      }
      
    }
    if(isAuthenticated){
        navigate('/login');
      }
    dispatch(clearErrors());
  }, [dispatch, error,navigate,isAuthenticated]);



  return (
    <Fragment>
        {loading?<Loader/>:(<section className="login bg-zinc-200 flex justify-center items-center min-h-screen ">
    <div className="w-full max-w-sm   ">
        <form action="/register" ref={registerTab} method="POST" encType="multipart/form-data" className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={registerSub}>
            <div className="mb-4">
                
                <span className="text-red-500 text-sm "></span>
                
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    Name
                </label>
                <input
                    name="name" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Enter your name"
                    value={username}
                    onChange={registerDataChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Email
                </label>
                <input
                name="email" 

                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="email" placeholder="Enter your email"
                    value={email}
                    onChange={registerDataChange}/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************"
                    value={password}
                    onChange={registerDataChange}/>
            </div>
            {/* <div id='registerImage' className="mb-6" >
                <label className="block text-gray-700 text-sm font-bold mb-2" for="image">
                    Profile 
                </label>
                <img src={avatarImage} alt="Avatar image"/>
                <input
                name="avatar"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="image" type="file" accept="image/*" onChange={registerDataChange}/>
            </div> */}
            <div className="flex items-center justify-between">
            <button
                    
                    className="bg-orange-500  text-gray-100  font-bold py-2 border-2 px-4 rounded-full hover:bg-gray-100 hover:text-orange-500 hover:border-orange-500 focus:outline-none focus:shadow-outline"
                    type="submit" >
                    Register
                </button>
                <Link className="inline-block align-baseline font-semibold text-sm text-orange-500" to="/login">
                    Already have an account?
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

export default Register