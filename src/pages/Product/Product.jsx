import React, { useState, useEffect, useRef } from 'react';

import ProductsList from '../../components/ProductsList/ProductsList';

import {ProductHolder} from './Product.styled';

import { useParams } from 'react-router-dom';

import {useProduct} from "../../utils/hooks/useProduct.js";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";


export default function Product({nav,products,addCart}){

   const [productInfo, setProductInfo] = useState(null);
   const [sellInfo, setSellInfo] = useState({
      price: 0,
      coin: 'USD',
      qty: 1,
      stk: 0,
      name: '',
      id: null,
      img: null,
   });
   const qtyRef = useRef();

   const {id} = useParams();
   const dataProduct = useProduct(id);
   
   useEffect(()=>{
     let temp = {};
     dataProduct?.data?.results?.forEach(d=>{
      temp = {...d};
     });

     let tempSell = {...sellInfo}
     tempSell.price = temp?.data?.price;
     tempSell.stk = temp?.data?.stock;
     tempSell.name = temp?.data?.name;
     tempSell.img = temp?.data?.images[0];
     tempSell.id = temp?.id;

     setProductInfo(temp);
     setSellInfo(tempSell);

     qtyRef.current.value = 1;

   },[dataProduct]);


   function updateQty(){
      let tempSell = {...sellInfo}
      if(parseInt(qtyRef?.current?.value) > tempSell.stk){
         return;
      }
      tempSell.qty = qtyRef?.current?.value;

      setSellInfo(tempSell);
   }

	return (
      <>
       <ProductHolder className="product">
       	  
          <div className="content flxR ordC itmS">
             <div className="col1">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  className="mySwiper">
                  {productInfo?.data?.images?.map((img,k)=>{
                   return <SwiperSlide key={'slide-'+k} className="imgContain" >
                              <img src={img.image?.url} 
                                   alt={img.image?.alt} />
                          </SwiperSlide>
                  })}
                </Swiper>
             </div> 
             <div className="col2 flxC ordS">
                
                <h1>{productInfo?.data?.name}</h1>
                <p className="txtS4 pT10">SKU: {productInfo?.data?.sku}</p>
                <p className="txtS4 pT10 txtCap">Category: {productInfo?.data?.category?.slug}</p>
                {(productInfo?.data?.category?.tags.length > 0)? productInfo?.data?.category?.tags.map(t=>
                   <p className="txtS4 pT10 txtCap">Tags: {t?.slug}</p>)
                   :''}
                <p className="txtS2 pT40 "><strong className="fontTitle">${sellInfo?.price*sellInfo?.qty}</strong> USD</p>
                <div className="qtySelector pT20 flxR ordC flxNoWrap">
                   <p className="pR5">Qty: </p>
                   <input type="number" ref={qtyRef} min="1" max={sellInfo?.stk} onChange={()=>{updateQty()}} className="qty txtC" />
                </div>


                <button className="button colorBBlack colorWhite mT40 wMax300" 
                        onClick={()=>{addCart(sellInfo); nav('cart')}}>Add To Cart</button>


                
             </div>

             <div className="col3">
                <p className="txtS3 pT40 "><strong className="fontTitle">Description</strong></p>
                <p className="txtS3 pT20 ">{productInfo?.data?.description?.map(d=>d.text).join('. ')}</p>

                <p className="txtS3 pT40"><strong className="fontTitle">Specifications</strong></p>
                <ul className="pT10 mL10">
                {productInfo?.data?.specs?.map(s=>{
                  return <li key={s.spec_name} className="txtS3 pT10 "><strong>{s.spec_name} :</strong> {s.spec_value}</li>
                })}
                </ul>
             </div>
          </div>

          
          
       </ProductHolder>

       <section>
          <ProductsList products={products?.data} nav={nav} title='Best Buys' />
          <div className="content flxR ordC mT60 mB60">
            <button className="button colorBBlack colorWhite cursor wMax300" 
                     onClick={()=>{nav('products')}} >View All Products</button>
           </div>
       </section>
       </>
	);
}