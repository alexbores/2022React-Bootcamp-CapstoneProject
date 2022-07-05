import React,{useEffect,useState} from 'react';


export default function Cart({nav,getLink,addCart,cart,removeCart}){
   
   const [total,setTotal] = useState(0);

   useEffect(()=>{
      let temp = 0;
      cart.map(p=>{
         temp += parseInt(p.price)*parseInt(p.qty);
      });
      setTotal(temp);
   },[cart]);

	return (

       <section className="products">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">Cart</h1>
          </div>
          
          
          <div className="content fullContent">
           <table className="wFull pT40">
             <thead>
               <tr>
                 <th className="">Product</th>
                 <th className="">Price</th>
                 <th className="">Qty</th>
                 <th className="">Total</th>
                 <th className="colorWhite">Delete</th>
               </tr>
             </thead>
             <tbody >
                 {cart.map(p=>{
                   return <Item data={p} key={p.id} addCart={addCart} nav={nav} removeCart={removeCart} />
                 })}
             </tbody>
           </table>

           <div className="wFull flxR pT40">
              <h3>Total $ {total} USD</h3>
           </div>
          </div>
       </section>
   );
}

function Item({data,addCart,removeCart,nav}){
  return <tr>
           <td><div className="flxR ordS itmC cursor" onClick={()=>{nav(`product/${data?.id}`)}}>
                <img className="s50" src={data.img?.image?.url} />
                <p className="pL5">{data.name}</p>
              </div>
           </td>
           <td><p>$ {data.price} USD</p></td>
           <td><p>{data.qty}</p></td>
           <td><p>$ {data.price*data.qty} USD</p></td>
           <td><p onClick={()=>{removeCart(data?.id)}} className="cursor round colorBError colorWhite s30 flxC ordC">-</p></td>
         </tr>
}