import React, { useState, useEffect, useRef ,useContext} from 'react';

import { AppContext } from "../../App.js";


export default function Checkout({cart}){
   const Utils = useContext(AppContext);
   const [total,setTotal] = useState(0);

   useEffect(()=>{
      updateTotal();
   },[cart]);


   function updateTotal(){
      setTotal(addAll);
   }

   function addAll(){
      let temp = 0;
      cart.map(p=>{
         temp += parseFloat(p.price)*parseInt(p.qty);
      });
      return (Math.round(temp*100)/100).toFixed(2);
   }


   function placeOrder(e){
      e?.preventDefault();

   }

	return (

       <section className="products">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">Checkout</h1>
          </div>
          
          
          <div className="content fullContent">
           <h2 className="mB20 mT20">Order Summary</h2>
           
           <table className="wFull pT40">
             <thead>
               <tr>
                 <th className="pB20 ">Product</th>
                 <th className="pB20 hideXs">Price</th>
                 <th className="pB20 ">Qty</th>
                 <th className="pB20 txtR">Total</th>
               </tr>
             </thead>
             <tbody >
                 {cart.map(p=>{
                   return <Item data={p} key={p.id} Utils={Utils} />
                 })}
                 <tr >
                   <td />
                   <td className="hideXs" />
                   <td />
                   <td><h3 className="mB20 mT20 txtR">$ {total} USD</h3></td>
                 </tr>
             </tbody>
           </table>

           <button className="button colorBrdBlack mB40 wMax300"
                   onClick={()=>{Utils.nav('cart')}}
                      >Back to Cart</button>

           <div className="wFull pT20 formHolder">
              <h2 className="mB20">Information</h2>
              <form onSubmit={placeOrder}>
                    <label>Enter your name:
                      <input type="text" className="mB20" />
                    </label>
                    <label>Enter your email:
                      <input type="email" className="mB20" />
                    </label>
                    <label>Enter your zipcode:
                      <input type="text" className="mB20" />
                    </label>
                    <label>Order Notes:
                      <textarea  className="mB20" />
                    </label>
                    

                      <button type="submit" className="button colorBBlack colorWhite mB20 wMax300"
                      >Place Order</button>
                    
              </form>
           </div>
          </div>
       </section>
   );
}

function Item({data,Utils}){

  const qtyRef = useRef();

  function updateQty(){
    if(parseInt(qtyRef?.current?.value) > data.stk){
       return;
    }
    Utils.addCart({id:data.id,
                   replaceQty: qtyRef?.current?.value,
                  });
  }

  return <tr >
           <td><div className="flxR ordS itmC cursor" 
                    onClick={()=>{Utils.nav(`product/${data?.id}`)}}>
                <p className="pL5">{data.name}</p>
              </div>
           </td>
           <td className="hideXs"><p>$ {data.price} USD</p></td>
           <td><p className="pR20">{data?.qty}</p></td>
           <td><p className="txtR">$ { (Math.round( (data.price*data.qty)*100 )/100).toFixed(2) } USD</p></td>
         </tr>
}