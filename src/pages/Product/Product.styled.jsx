import styled from 'styled-components';


export const ProductHolder = styled.section`
   padding-top: 60px;
   

   .col1{
      width: 40%;
      max-height: 500px;
      

      .mySwiper img{
        max-height: 500px;
        object-fit: contain;
        width:auto;
      }
   }
   .col2{
      width: 60%;
      padding-left: 60px;
   }
   .col3{
      width:100%;
   }


   .qtySelector{
      .qty{
         width:100px;
      }
   }

   @media screen and (max-width: 630px){
     .col1,
     .col2{
       width: 100%;
     }
     .col1{
      .mySwiper img{
        max-height: auto;
        object-fit: contain;
        width:100%;
      }
     }
     .col2{
      padding-left: 0px;
      padding-top: 40px;
     }
   }


`;