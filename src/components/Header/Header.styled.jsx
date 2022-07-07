import styled from 'styled-components';


export const Menu = styled.section`
  
  background-color: var(--mnr-colorWhite);
  
  .content{
  	min-height: 80px;
  }

  .options,
  .logoHolder{

    .logo {
    	white-space: nowrap;
    	font-size: clamp(20px, 5vw, var(--mnr-fontS2));
      span {
        font-size: clamp(16px, 4vw, var(--mnr-fontS3));
      }
    }
  } 
  .options{

    .option{
    	.num {
    		bottom: 28px;
            left: -30px;
    		right: 0;
    	}
    }

  }

  .options .option.menuIcon{
      display: none;
  }

  @media screen and (max-width:720px){
    .options{
      p.option{
        display:none;
      }
    }
    .options .option.menuIcon{
       display: flex;
    }
  }



`;


export const SmallMenu = styled.section`
  
  
  right: ${props => props.open ? 0 : "-100vw"};
  width: clamp(270px,90vw, 300px);
  
  background-color: var(--mnr-colorBlack);
  
  .lineH{
   border-top: 2px solid white;
   opacity: 0.5;
   height: 2px;
  }
  
  
  p.option{
      color:white;
      font-size: var(--mnr-fontS3);
      margin-bottom: 20px;
  }


`;

export const SearchMenu = styled.section`
  
  
  top: ${props => props.open ? 0 : "-120vh"};
  
  
  
  
  height: 100vh;
  left: 0;
  position: fixed;
  margin:auto;
  
  .contentHolder{
    width: clamp(300px,90vw,700px);
    background-color: var(--mnr-colorWhite);
    height: clamp(200px, 65vh, 300px);
    border-radius: 3px;
  }

`;

