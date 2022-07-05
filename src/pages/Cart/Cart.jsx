import React,{useEffect,useState} from 'react';


export default function Cart({nav,getLink,addCart,cart}){


	return (

       <section className="products">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">Cart</h1>
          </div>
          
          {cart.map(p=>{
            return <h2>{p.id}</h2>
          })}
       </section>
	);
}