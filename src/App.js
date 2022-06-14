import React, {useState, useEffect} from 'react';  
import './App.css';
// import './style.css';

import Global from './style';


import "swiper/swiper-bundle.min.css";


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageLoader from './components/PageLoader/PageLoader';

import Home from './pages/Home/Home';
import Products from './pages/Products/Products';

import featureProducts from "./mocks/en-us/featured-products.json";
import featureBanners from "./mocks/en-us/featured-banners.json";
import categories from "./mocks/en-us/product-categories.json";
import products from "./mocks/en-us/products.json";


function App() {
  const [pagePath,setPagePath] = useState(-1);
  const [pageLoader,setPageLoader] = useState(2);

  useEffect(()=>{
    nav('');
  },[]);


  const data  = {
      featureBanners,
      featureProducts,
      products,
      categories,
    };
  
  function nav(path){
    if(path !== -1){
      window.scrollTo({
           top: 0,
           behavior: 'smooth',
      });
      setPageLoader(2);
      setPagePath(path);
      setTimeout(() => {
        setPageLoader(1);
        setTimeout(() => {
         setPageLoader(0);
        }, 500);
      }, 2000);
    } 
  }

  function getPage(path){
    switch(path){
      case '':
        return (<Home data={data} nav={nav} />);
      case 'all-products':
        return (<Products data={data} nav={nav} />);
      default:
        return (<div >404</div>);
    }
  }


  return (
    <>
      <Global />

      <Header nav={nav} />

      <PageLoader show={pageLoader} />
      
      <main>
        {getPage(pagePath)}
      </main>
      
      <Footer />
    </>
  );
}

export default App;
