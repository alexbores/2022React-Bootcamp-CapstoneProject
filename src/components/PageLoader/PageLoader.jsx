import React from 'react';

import {PageLoaderHolder} from './PageLoader.styled';

export default function PageLoader({show,fixed}){

	return (

       <PageLoaderHolder 
          className={((!!fixed)? 'posT posL fixedFull fixed': 'absS' ) + " anim3 wFull hFull flxC ordC zMax"} 
          show={show}>
          <div className="holder">
       	    <div className="spinner load3" />
       	  </div>
       </PageLoaderHolder>
	);
}