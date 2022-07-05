import React, {useRef} from 'react';

import {SearchBarHolder} from './SearchBar.styled';

import {ReactComponent as SearchIcon} from '../../assets/search.svg';

// import { useLocation } from 'react-router-dom'


export default function SearchBar({nav, callback}){
    const searchInput = useRef();

    // console.log(location.pathname);
    
    function sendSearch(e){
        e?.preventDefault();
        if(searchInput.current.value){
           nav(`search?q=${searchInput.current.value}`);
           searchInput.current.value = '';
           if(callback){
             callback();
           } 
        }
        return;
    }

	return (
       <SearchBarHolder className="wFull">
           <form onSubmit={sendSearch}>
             <input placeholder="Type a word to search" className="wFull" ref={searchInput} />
             <SearchIcon onClick={sendSearch} className="icon posT posB mAuto abs z1 s30 s25Xs colorSvgBlack cursor" />
           </form>
       </SearchBarHolder>
	);
}