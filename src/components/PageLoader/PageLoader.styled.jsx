import styled from 'styled-components';


export const PageLoaderHolder = styled.div`
  
  background-color: rgba(255,255,255,1);
  
  opacity: ${props => props.show === 2 ? 1 : 0 };

  display: ${props => props.show === 0 ? 'none' : 'flex' };

  

  

`;