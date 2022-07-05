import styled from 'styled-components';


export const ProductsHolder = styled.section`

   .col1{
      width: 20%;
   }
   .col2{
   	max-width: calc(${props => props.hasCat ? '80%' : '100%'} + var(--mnr-padSides));
      min-height: 200px;
   }
   
   .col1{ 
    .cat{
      position: relative;
      :after{
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        max-width: 0;
        transition: all .5s;
        position: absolute;
        left: 0;
        bottom: -1px;
      }
    }
   
    .cat.selected{
     :after{
       background-color: var(--mnr-colorBlack);
       max-width: 200px;
     }
    }
    .cat:hover{
      opacity: 0.8;
    }
   }
  
   .productCard{
      width: calc(${ props => props.hasCat ? '33.33%' : '25%'  } - (var(--mnr-gutter)));
   }

   

   @media screen and (max-width:960px){
      .productCard{
         width: calc(${ props => props.hasCat ? '50%' : '33.33%'  } - (var(--mnr-gutter)));
      }
   }
   @media screen and (max-width:${ props => props.hasCat ? '740px' : '630px'  }){
      .col2{
         max-width: calc(100% + var(--mnr-padSides));
      }
      .productCard{
         width: calc(33.33% - (var(--mnr-gutter)));
      }
      .col1{
         width: 100%;
      }
      .col1{ 
       flex-direction: row;
       flex-wrap: wrap;
       h3{
         width: 100%;
       }
       .cat{
         position: relative;
         margin-top: 10px;
         margin-left: 20px;
       }
     }
   }
   @media screen and (max-width:630px){
      .productCard{
         width: calc(50% - (var(--mnr-gutter)));
      }
   }

`;