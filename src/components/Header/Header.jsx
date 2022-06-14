import React, {useState} from 'react';

import {Menu, SmallMenu} from './Header.styled';

import {ReactComponent as CartIcon} from '../../assets/cart.svg';
import {ReactComponent as SearchIcon} from '../../assets/search.svg';
import {ReactComponent as MenuIcon} from '../../assets/menu.svg';
import {ReactComponent as CloseIcon} from '../../assets/close.svg';


export default function Header({nav}){
    
    const [smallMenu,setSmallMenu] = useState(false);
    const menu = [
       {name:"Home",path:""},
       {name:"Store",path:"all-products"},
       {name:"Categories",path:"/"},
    ];
    
    function Option({data}){
        return (
           <p className="option mL30 txtS3 cursor" onClick={()=>{nav(data.path)}}>{data.name}</p>
        );
    }

	return (
       <>
       <Menu className="fixedFull fixedC fixed z5">
       	<div className="content fullContent flxR ordC flxNoWrap">
       		<div className="logoHolder flxR ordS itmC">
       		   <h1 className="logo txtS2 txtS3Sm" 
                   onClick={()=>{nav('')}}>Alex's <span>WorkShop</span></h1>
       		</div>

       		<div className="options wFull flxR flxNoWrap ordE itmC">
                {menu?.map(m=>{
                    return <Option key={m.path+m.name} data={m} />
                })}
                
                <div className="option mL35 searchIcon">
       				<SearchIcon className="s30 s25Xs" />
       			</div>
       			<div className="option mL30 mL20Xs cartIcon rltv">
       				<CartIcon className="s30 s25Xs" />
       				<p className="flxC ordC num abs mAuto s15 txtS6 colorTWhite colorBBlack  round">1</p>
       			</div>
       			<div className="option mL30 mL20Xs menuIcon showSm">
       				<MenuIcon className="s30 s25Xs" onClick={()=>{setSmallMenu(!smallMenu)}}/>
       			</div>
       		</div>
       	</div>
       </Menu>
       {(smallMenu) &&
         <div className="wFull hFull posT posL backShadow z10 fixed fixedFull" />
       }
       <SmallMenu className="fixed z20 posT colorBBlack anim3 hFullvh" open={smallMenu}>
         <div className="scroll hFull wFull pT20 pB40">
     
            <div className="flxC itmE hAuto wFull pR pL20">
               
               <div className="wFull flxR ordE">
                  
                  <div className="flxC ordC closeBtn size30 z2 cursor iconHover" 
                       onClick={()=>{setSmallMenu(!smallMenu)}} >
                       <CloseIcon className="s30 s25Xs colorSvgWhite" />
                  </div>

               </div>


               <div className="wFull lineH mT20 mB20" />
               
               {menu?.map(m=>{
                    return <Option key={m.path+m.name+2} data={m} />
                })}
               
               <div className="wFull lineH mT20 mB5" />

               
               
            </div>

         </div>
       </SmallMenu>
       <div className="h80" />
       </>
	);
}