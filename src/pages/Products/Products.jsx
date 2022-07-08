import React,{useEffect,useState} from 'react';

import ProductsList from '../../components/ProductsList/ProductsList';
import Pagination from '../../components/Pagination/Pagination';

import { useSearchParams } from "react-router-dom";

import {useProducts} from "../../utils/hooks/useProducts.js";



export default function Products({categories}){


   const [searchParams] = useSearchParams();
   const page = searchParams.get('page');
   const qWord = searchParams.get('category');
   const dataProducts = useProducts({page,qWord});
   const [products,setProducts] = useState();

   useEffect(()=>{
     let temp = {...dataProducts}
     setProducts(temp);
   },[dataProducts]);


   useEffect(()=>{
      setProducts(products?.reFetch({page,qWord}));
   },[searchParams]);




	return (

       <section className="products">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">All Products</h1>
          </div>
          
          <ProductsList products={products?.data} loading={dataProducts?.isLoading}  categories={categories?.data?.results}  />
          
          <Pagination data={products?.data} />
       </section>
	);
}