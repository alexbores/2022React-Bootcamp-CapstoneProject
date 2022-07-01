import React from 'react';
import { useSearchParams } from "react-router-dom";

import {ReactComponent as PrevIcon} from '../../assets/flecha-izquierda.svg';
import {ReactComponent as NextIcon} from '../../assets/flecha-derecha.svg';


export default function Pagination({data,nav}){
    const [searchParams] = useSearchParams();
    
    // console.log(searchParams.all());

    function getLink(data){
        const path = window.location.pathname;
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        let url = window.location.pathname;

        let first = true;
        function getJoin(){
            if(first){
              first = false;
              return '?';
            }
            else{
              return '&';
            }
        }
        let found = false;
        
        for(let entry of params.entries()) {
          if(Object.keys(data)[0] === entry[0]){
            url += `${getJoin()}${entry[0]}=${data[Object.keys(data)[0]]}`;
            found = true;
          }
          else{
            url += `${getJoin()}${entry[0]}=${entry[1]}`;
          }
        }

        if(!found){
          url += `${getJoin()}${Object.keys(data)[0]}=${data[Object.keys(data)[0]]}`;
        }


        return url;
    }

    const prev = getLink({"page":data?.page-1});
    const next = getLink({"page":data?.page+1});


	return (
       <div className="flxCellFull flxR ordC pag pT30 pB60">
          <button className="button s50 rltv round colorBBlack m20" 
                  onClick={()=>{nav(prev)}}>
             <PrevIcon className="w50 hAuto posC abs mAuto anim3 colorSvgTWhite" />
          </button>
          <p>{data?.page} / {data?.total_pages}</p>
          <button className="button s50 rltv round colorBBlack m20" 
                  onClick={()=>{nav(next)}}>
             <NextIcon className="w50 hAuto posC abs mAuto anim3 colorSvgTWhite" />
          </button>
       </div>
	);
}