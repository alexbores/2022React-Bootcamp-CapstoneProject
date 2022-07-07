import React,{useEffect,useContext} from 'react';
import { useSearchParams } from "react-router-dom";

import {ReactComponent as PrevIcon} from '../../assets/flecha-izquierda.svg';
import {ReactComponent as NextIcon} from '../../assets/flecha-derecha.svg';

import { AppContext } from "../../App.js";

export default function Pagination({data}){
    // const [searchParams] = useSearchParams();
    
    // console.log(data);
    const Utils = useContext(AppContext);
    

    const prev = Utils.getLink({"page":(data?.page === 1)? data?.page : data?.page-1});
    const next = Utils.getLink({"page":(data?.page === data?.total_pages)? data?.page : data?.page+1});
    

    useEffect(()=>{
      if(data?.page > data?.total_pages){
        Utils.nav({"page":1});
      }
    },[]);

	return (
       <div className="flxCellFull flxR ordC pag pT30 pB60">
          <button className="button s50 rltv round colorBBlack m20" 
                  onClick={()=>{Utils.nav(prev,false)}}>
             <PrevIcon className="w50 hAuto posC abs mAuto anim3 colorSvgTWhite" />
          </button>
          <p>{data?.page} / {data?.total_pages}</p>
          <button className="button s50 rltv round colorBBlack m20" 
                  onClick={()=>{Utils.nav(next,false)}}>
             <NextIcon className="w50 hAuto posC abs mAuto anim3 colorSvgTWhite" />
          </button>
       </div>
	);
}