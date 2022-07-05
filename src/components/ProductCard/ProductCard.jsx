import React from 'react';

import {ProductHolder} from './ProductCard.styled';
import {ReactComponent as CartIcon} from '../../assets/cart.svg';



export default function ProductCard({data,nav,addCart}){
  // console.log(data.tags.map());
  
  // console.log(data);

	return (
     <ProductHolder className="productCard round6 p20 pL5Xs pR5Xs pB10Xs">
       {/*<p className="txtC">{data?.tags.map(m=>m+', ')}</p>*/}
       <p className="txtC">{data?.data?.category?.slug}</p>
       <div className="imgHolder rltv">
         <img 
           className="mainImg absS anim3 imgContain"
           src={data?.data?.mainimage?.url} 
           alt={data?.data?.name} />
           <img 
             className="secondImg absS anim3 imgContain"
             src={(data?.data?.images?.length >= 1)? data?.data?.images[1]?.image?.url : data?.data?.mainimage?.url} 
             alt={data?.data?.name+'2'} />
       </div>
       <h3 className="txtC txtS4 pB5">{data?.data?.name}</h3>
       <p className="price txtS3 txtC">$ {data?.data?.price}</p>
       <div className="buttonsHolder pT20 flxR ordC flxNoWrap">
         <button className="button rltv wishBtn round colorBBlack mR20 mR10Xs"
                 onClick={()=>{
                   addCart({
                       price: data?.data?.price,
                       coin: 'USD',
                       qty: 1,
                       stk: data?.data?.stock,
                       name: data?.data?.name,
                       id: data?.id,
                       img: data?.data?.images[0],
                    });
                 }}
                 >
           <CartIcon className="s30 posC abs mAuto anim3 colorSvgWhite" />
         </button>
         <button onClick={()=>{nav(`product/${data?.id}`)}} className="button colorBBlack colorWhite cursor moreBtn">View More</button>
       </div>
       
     </ProductHolder>
	);
}