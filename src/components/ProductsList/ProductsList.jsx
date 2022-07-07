import React, {useEffect, useState ,useContext} from 'react';

import {ProductsHolder} from './ProductsList.styled';
import ProductCard from '../ProductCard/ProductCard';
import PageLoader from '../PageLoader/PageLoader';

import { useSearchParams } from "react-router-dom";

import { AppContext } from "../../App.js";


export default function ProductsList({products,loading,title,categories}){
  // console.log(categories);
  // console.log(products);

  const Utils = useContext(AppContext);

  const [searchParams] = useSearchParams();
  
  const [allProds, setAllProds] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);

  const initCats = searchParams.get('category');

  let pageLoaded = false;


  useEffect(()=>{
    // console.log(products);
    // console.log(loading);
    let tempAllProds = (products?.results)? [...products.results] : [];

    tempAllProds.forEach(p=>{
       if(p.data?.main_image){
        p.data.mainimage = p.data.main_image;
       }
       if(!!p.data?.images === false){
        p.data.images = [];
       }
    });

    setAllProds(tempAllProds);

    // console.log(initCats);
    
    setSelectedCats(getNewCats(initCats,[...selectedCats]));

    pageLoaded = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[products,searchParams]);



  
  function getNewCats(catList,currentCats){
    let currentCatsList = [...currentCats];
    if(catList){
      
      let cats = catList?.split(",");
      for(let c of cats){
        // c = c.toLowerCase();
        if(currentCatsList?.includes(c)){
          currentCatsList = currentCatsList.filter(s=>{
          return (s !== c);
         });
        }
        else{
         currentCatsList.push(c);
        }
      }
      
      
    }
    return currentCatsList;
  }
 
  function toggleSelectedCat(name){
    let catList = getNewCats(name,[...selectedCats]);
    setSelectedCats(catList);
    updateCategoryUrl(catList);
  }

  function clearFilters(){
    setSelectedCats([]);
    removeCatsUrl();
  }

  function updateCategoryUrl(catList){
    let cats = catList;
    let link = Utils.getLink({"category":(cats?.length > 0)? cats : ''});
    

    Utils.nav(link,false);
  }
  function removeCatsUrl(){
    Utils.nav(Utils.getLink({"category":''}),false);
  }

	return (
     <ProductsHolder className="mT60" hasCat={categories?.length}>
       {(title) &&
        <div className="content fullContent">
         <h2 className="sectionTitle"><span>{title}</span></h2>
        </div>
       }

       <div className="productsContent content fullContent pT40 flxR">

         {(categories) &&
           <div className="col1 pR flxC  pB30">
              <h3 className="pB20">Categories</h3>
              {categories?.map(cat=>{
                return <h4 key={cat?.id} 
                           className={"cat cursor mT20 mB5 "+
                                      ((selectedCats.includes(cat?.id)) && 'selected')}
                           onClick={()=>{toggleSelectedCat(cat?.id)}}>{cat?.data?.name}</h4>
              })}

              {(selectedCats.length>0)? 
                <p className="txtS5 cursor mT25 mB5" role="button" onClick={()=>{clearFilters();}}>Clear Filter</p>:''}
           </div>
         }
         <div className="col2 flxR flxGrd rltv">
           {allProds.map(product=>{
             return <ProductCard key={product.id} data={product} />;
            })}
           {(allProds.length === 0 && !!loading === false) ? 
            <h4 className="flxCellFull txtC mT60 mB60">No Products Found</h4> : ''}
           {(!!loading) ?
            <PageLoader show={2}  /> : ''}
          
         </div>
       </div>
       
       
     </ProductsHolder>
	);
}