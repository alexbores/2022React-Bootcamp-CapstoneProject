import React from 'react';

import MainBanner from '../../components/MainBanner/MainBanner';
import CardSlider from '../../components/CardSlider/CardSlider';
import ProductsList from '../../components/ProductsList/ProductsList';


// import { useFeaturedBanners } from '../../utils/hooks/useFeaturedBanners';

export default function Home({data,nav}){

   

	return (

       <section className="home">
       	  
       	  <MainBanner banners={data?.featureBanners?.results} />
          
           <CardSlider  cards={data?.categories?.results} title='Categories' />

           <ProductsList products={data?.featureProducts} title='Best Buys' />
       	  
           <div className="content flxR ordC mT60 mB60">
             <button className="button colorBBlack colorWhite cursor wMax300" 
                     onClick={()=>{nav('all-products')}} >View All Products</button>
           </div>

       </section>
	);
}