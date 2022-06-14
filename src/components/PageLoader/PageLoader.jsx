import React from 'react';

import {PageLoaderHolder} from './PageLoader.styled';

export default function PageLoader({show}){

	return (

       <PageLoaderHolder className="anim3 posT posL fixedFull fixed wFull hFull flxC ordC zMax" show={show}>
          <div className="holder">
       	    <div className="spinner load3" />
       	  </div>
       </PageLoaderHolder>
	);
}