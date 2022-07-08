import React, {useContext} from 'react';
// import { Link } from 'react-router-dom';

import MainBanner from '../../components/MainBanner/MainBanner';
import CardSlider from '../../components/CardSlider/CardSlider';
import ProductsList from '../../components/ProductsList/ProductsList';

import {AppContext} from '../../App.js'

// import { useFeaturedBanners } from '../../utils/hooks/useFeaturedBanners';

export default function Home({banners,categories,products}){

   const Utils = useContext(AppContext);

	return (

       <section className="home">
       	  
       	  <MainBanner banners={banners?.data?.results} />
          
           <CardSlider  cards={categories?.data?.results} title='Categories' />

           <ProductsList products={products?.data} title='Best Buys'  />
       	  
           <div className="content flxR ordC mT60 mB60">
            <button className="button colorBBlack colorWhite cursor wMax300" 
                     onClick={()=>{Utils.nav('products')}} >View All Products</button>
           </div>

       </section>
	);
}