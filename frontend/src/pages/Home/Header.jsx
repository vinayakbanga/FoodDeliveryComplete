import React from 'react'
import headerimage from "../../img1/Burger1.png"

const Header = () => {
  return (
    <section className='mx-auto max-w-7xl my-7 py-8 px-2 lg:px-2  '>
        <div className='flex items-center  justify-center'>
        <div className="w-1/2 font-medium">
            <h6 className="text-2xl"><em>Hey!</em></h6>
            <h1 className="text-xl md:text-4xl  font-bold">Welcome to the world of burgers!</h1>
            <button className="px-6 py-2 rounded-full text-white font-normal mt-4 bg-orange-500 md:font-semibold ">Order Now</button>
        </div>
        <div className="w-1/2 flex items-center justify-center">
            <img src={headerimage} alt='Header'/>            
        </div>
        </div>

    </section>
  )
}

export default Header