import React from 'react'
import Itemcard from '../../Components/Itemcard'



const MenuSec = ({items}) => {

 

  
  return (
    <section className='mx-auto max-w-7xl my-7 py-8 px-2 lg:px-2   '>
        <h1 className=" text-2xl md:text-5xl heading font-semibold mb-8 text-center">Menu</h1>
        <h1 className=" text-2xl -md:text-5xl heading font-bold mb-8 text-center">Burger</h1>
        <div className='flex gap-5 md:gap-2 flex-wrap items-center justify-evenly'>
        {items
          .filter(item => item.category === "burger") // Filter items with category "burger"
          .map(item => (
            <Itemcard key={item._id.$oid} menuitem={item} />
          ))}
      </div>


      <h1 className=" text-2xl -md:text-5xl heading font-bold mb-8 text-center">Shakes</h1>
        <div className='flex gap-5 md:gap-2 flex-wrap items-center justify-evenly'>
        {items
          .filter(item => item.category === "shake") // Filter items with category "burger"
          .map(item => (
            <Itemcard key={item._id.$oid} menuitem={item} />
          ))}
      </div>

      <h1 className=" text-2xl -md:text-5xl heading font-bold mb-8 text-center">Sides</h1>
        <div className='flex gap-5 md:gap-2 flex-wrap items-center justify-evenly'>
        {items
          .filter(item => item.category === "Sides") // Filter items with category "burger"
          .map(item => (
            <Itemcard key={item._id.$oid} menuitem={item} />
          ))}
      </div>

         
    </section>
  )
}

export default MenuSec