import React, { useState, useEffect, useRef ,useContext} from 'react';

import { AppContext } from "../../App.js";



export default function Cart({cart}){
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

	return (

       <section className="products">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">Cart</h1>
          </div>
          
          
          <div className="content fullContent">
           <table className="wFull pT40">
             <thead>
               <tr>
                 <th className="pB20 ">Product</th>
                 <th className="pB20 hideXs">Price</th>
                 <th className="pB20 ">Qty</th>
                 <th className="pB20 ">Total</th>
                 <th className="pB20 colorWhite">Delete</th>
               </tr>
             </thead>
             <tbody >
                 {cart.map(p=>{
                   return <Item data={p} key={p.id} Utils={Utils} />
                 })}
             </tbody>
           </table>

           <div className="wFull flxC ordE pT40">
              <h3 className="mB40 pR10">Total $ {total} USD</h3>
              <button className="button colorBBlack colorWhite mB40 wMax300"
                      onClick={()=>{Utils.nav('checkout')}}>To Checkout</button>
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
           <td><div className="flxR ordS itmC cursor" onClick={()=>{Utils.nav(`product/${data?.id}`)}}>
                <img className="s50 hideXs" src={data.img?.image?.url} />
                <p className="pL5">{data.name}</p>
              </div>
           </td>
           <td className="hideXs"><p>$ {data.price} USD</p></td>
           <td><p className="pR20">
           <input value={data?.qty} 
                  type="number" 
                  ref={qtyRef} 
                  min="1" max={data?.stk} 
                  onChange={()=>{updateQty()}} 
                  className="qty txtC" /></p></td>
           <td><p>$ { (Math.round( (data.price*data.qty)*100 )/100).toFixed(2) } USD</p></td>
           <td><p onClick={()=>{Utils.removeCart(data?.id)}} 
                  className="cursor mAuto round colorBError colorWhite s30 flxC ordC">-</p></td>
         </tr>
}