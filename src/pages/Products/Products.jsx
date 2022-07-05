import React,{useEffect,useState} from 'react';

import ProductsList from '../../components/ProductsList/ProductsList';
import Pagination from '../../components/Pagination/Pagination';

import { useSearchParams } from "react-router-dom";



import {useProducts} from "../../utils/hooks/useProducts.js";


export default function Products({categories,nav}){

   const [searchParams] = useSearchParams();
   const page = searchParams.get('page');
   const dataProducts = useProducts(page);
   const [products,setProducts] = useState();

   useEffect(()=>{
     let temp = {...dataProducts}
     setProducts(temp);
   },[dataProducts]);


   useEffect(()=>{
      setProducts(products?.reFetch(page));
      console.log();
   },[searchParams]);




	return (

       <section className="products">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">All Products</h1>
          </div>
          
          <ProductsList products={products?.data} nav={nav} categories={categories?.data?.results} initCat={searchParams.get('category')} />
          
          <Pagination data={products?.data} nav={nav}/>
       </section>
	);
}