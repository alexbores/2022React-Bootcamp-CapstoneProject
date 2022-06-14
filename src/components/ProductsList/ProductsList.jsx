import React, {useEffect, useState} from 'react';

import {ProductsHolder} from './ProductsList.styled';
import ProductCard from '../ProductCard/ProductCard';

import {ReactComponent as PrevIcon} from '../../assets/flecha-izquierda.svg';
import {ReactComponent as NextIcon} from '../../assets/flecha-derecha.svg';



export default function ProductsList({products,title,categories}){
  // console.log(categories);
  // console.log(products);

  const [allProds, setAllProds] = useState([...products.results]);
  const [selectedCats, setSelectedCats] = useState([]);

  useEffect(()=>{
    let tempAllProds = [...allProds];
    tempAllProds?.forEach(p=>p.selected = true);
    setAllProds(tempAllProds);
  },[]);
  
 
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
                return <h4 key={cat?.data?.name} 
                           className={"cat cursor mT20 mB5 "+
                                      ((selectedCats.includes(cat?.data?.name?.toLowerCase())) && 'selected')}
                           onClick={()=>{toggleSelectedCat(cat?.data?.name)}}>{cat?.data?.name}</h4>
              })}
           </div>
         }
         <div className="col2 flxR flxGrd">
           {allProds.filter(product=>product.selected)?.map(product=>{
             return <ProductCard key={product.id} data={product} />;
            })}
           {(allProds.filter(product=>product.selected).length === 0) ? 
            <h4 className="flxCellFull txtC mT60 mB60">No Products Found</h4> : ''}

            {(categories) &&
              <div className="flxCellFull flxR ordC pag pT30 pB60">
                 <button className="button rltv round colorBBlack m20">
                    <PrevIcon className="posC abs mAuto anim3 colorSvgTWhite" />
                 </button>
                 <p>1 / 50</p>
                 <button className="button rltv round colorBBlack m20">
                    <NextIcon className="posC abs mAuto anim3 colorSvgTWhite" />
                 </button>
              </div>
            }
         </div>
       </div>
       
       
     </ProductsHolder>
	);
}