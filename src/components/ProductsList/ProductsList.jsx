import React, {useEffect, useState} from 'react';

import {ProductsHolder} from './ProductsList.styled';
import ProductCard from '../ProductCard/ProductCard';





export default function ProductsList({products,title,categories,initCat,nav}){
  // console.log(categories);
  // console.log(products);
  
  const [allProds, setAllProds] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);


  useEffect(()=>{
    // console.log((products));
    let tempAllProds = (products?.results)? [...products.results] : [];
    tempAllProds.forEach(p=>{
       p.selected = true
       if(p.data?.main_image){
        p.data.mainimage = p.data.main_image;
       }
       if(!!p.data?.images === false){
        p.data.images = [];
       }
    });

    // console.log(selectedCats);

    if(initCat){
      let tempSelectedCats = [];
      if(tempSelectedCats.includes(initCat)){
       tempSelectedCats = tempSelectedCats.filter(s=>{
        return (s !== initCat);
       });
      }
      else{
       tempSelectedCats.push(initCat);
      }
      
      tempAllProds?.forEach(p=>{
        p.selected = (tempSelectedCats.length>0) ? 
                       ( (tempSelectedCats.includes(p?.data?.category?.slug?.toLowerCase())) ? true : false) : 
                       true;
      });

      setSelectedCats(tempSelectedCats);
    }

    if(selectedCats?.length>0){
       tempAllProds?.forEach(p=>{
         p.selected = (selectedCats.length>0) ? 
                        ( (selectedCats.includes(p?.data?.category?.slug?.toLowerCase())) ? true : false) : 
                        true;
       });
    }


    setAllProds(tempAllProds);

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[products]);

  
  
 
  function toggleSelectedCat(name){
    let tempSelectedCats = [...selectedCats];

    let catName = name.toLowerCase();

    if(tempSelectedCats.includes(catName)){
     tempSelectedCats = tempSelectedCats.filter(s=>{
      return (s !== catName);
     });
    }
    else{
     tempSelectedCats.push(catName);
    }
    
    let tempAllProds = [...allProds];
    tempAllProds?.forEach(p=>{
      p.selected = (tempSelectedCats.length>0) ? 
                     ( (tempSelectedCats.includes(p?.data?.category?.slug?.toLowerCase())) ? true : false) : 
                     true;
    });

    
    setAllProds(tempAllProds);
    setSelectedCats(tempSelectedCats);
  }


  function clearFilters(){
    let tempAllProds = [...allProds];
    tempAllProds?.forEach(p=>{
      p.selected = true;
    });
    setAllProds(tempAllProds);
    setSelectedCats([]);
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
                                      ((selectedCats.includes(cat?.slugs[0].toLowerCase())) && 'selected')}
                           onClick={()=>{toggleSelectedCat(cat?.slugs[0])}}>{cat?.data?.name}</h4>
              })}

              {(selectedCats.length>0)? 
                <p className="txtS5 cursor mT25 mB5" role="button" onClick={()=>{clearFilters();}}>Clear Filter</p>:''}
           </div>
         }
         <div className="col2 flxR flxGrd">
           {allProds.filter(product=>product.selected)?.map(product=>{
             return <ProductCard key={product.id} data={product} nav={nav} />;
            })}
           {(allProds.filter(product=>product.selected).length === 0) ? 
            <h4 className="flxCellFull txtC mT60 mB60">No Products Found</h4> : ''}

            
         </div>
       </div>
       
       
     </ProductsHolder>
	);
}