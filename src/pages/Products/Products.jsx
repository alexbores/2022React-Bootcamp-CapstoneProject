import React from 'react';

import ProductsList from '../../components/ProductsList/ProductsList';


export default function Products({data}){

   

	return (

       <section className="products">
       	  <div className="content fullContent colorBBlack hMin200 flxC ordC">
       	    <h1 className="txtC colorWhite">All Products</h1>
          </div>
          
          <ProductsList products={data?.products} categories={data?.categories?.results}  />

       </section>
	);
}