import React,{useEffect,useState} from 'react';

import ProductsList from '../../components/ProductsList/ProductsList';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';

import {useSearch} from "../../utils/hooks/useSearch.js";

import { useSearchParams } from "react-router-dom";



export default function Search({nav}){

   const [searchParams] = useSearchParams();
   const qWord = searchParams.get('q');
   const page = searchParams.get('page');

   const dataProducts = useSearch({qWord,page});

   const [products,setProducts] = useState();

   useEffect(()=>{
     let temp = {...dataProducts}
     setProducts(temp);
   },[dataProducts]);

   useEffect(()=>{
      setProducts(products?.reFetch({qWord,page}));
   },[searchParams]);

   

	return (

       <section className="products pB40">
       	 <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">Search:</h1>
             {(qWord)&& <h2 className="txtC colorWhite pT10">"{qWord}"</h2>}
          </div>
          
          <div className="content pT40">
            <SearchBar nav={nav} />
          </div>
          
          <ProductsList products={products?.data} nav={nav}  />

          <Pagination data={products?.data} nav={nav} />

       </section>
	);
}