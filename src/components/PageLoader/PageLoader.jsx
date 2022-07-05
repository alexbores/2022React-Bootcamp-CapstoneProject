import React from 'react';

import {PageLoaderHolder} from './PageLoader.styled';

export default function PageLoader({show,fixed,classes}){

	return (

       <PageLoaderHolder 
          className={((!!fixed)? 'posT posL fixedFull fixed zMax': 'absS z10' ) + " mAuto anim3 wFull hFull flxC ordC"} 
          show={show}>
          <div className="holder m20">
       	    <div className="spinner load3" />
       	  </div>
       </PageLoaderHolder>
	);
}