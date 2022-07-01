import React from 'react';
// import { Link } from 'react-router-dom';

import MainBanner from '../../components/MainBanner/MainBanner';
import CardSlider from '../../components/CardSlider/CardSlider';
import ProductsList from '../../components/ProductsList/ProductsList';


// import { useFeaturedBanners } from '../../utils/hooks/useFeaturedBanners';

export default function Home({banners,categories,products,nav}){

   

	return (

       <section className="home">
       	  
       	  <MainBanner banners={banners?.data?.results} />
          
           <CardSlider  cards={categories?.data?.results} nav={nav} title='Categories' />

           <ProductsList products={products?.data} nav={nav} title='Best Buys' />
       	  
           <div className="content flxR ordC mT60 mB60">
            <button className="button colorBBlack colorWhite cursor wMax300" 
                     onClick={()=>{nav('products')}} >View All Products</button>
           </div>

       </section>
	);
}