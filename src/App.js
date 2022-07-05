import React, {useState, useEffect} from 'react';  
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
// import './style.css';

import Global from './style';


import "swiper/swiper-bundle.min.css";


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageLoader from './components/PageLoader/PageLoader';

import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Search from './pages/Search/Search';

// import featureProducts from "./mocks/en-us/featured-products.json";
// import featureBanners from "./mocks/en-us/featured-banners.json";
// import categories from "./mocks/en-us/product-categories.json";
// import products from "./mocks/en-us/products.json";


import {useFeaturedBanners} from "./utils/hooks/useFeaturedBanners.js";
import {useFeaturedProducts} from "./utils/hooks/useFeaturedProducts.js";

import {useCategories} from "./utils/hooks/useCategories.js";


function App() {
  const history = useNavigate();
  // const [pagePath,setPagePath] = useState(-1);
  const [pageLoader,setPageLoader] = useState(0);
  const [initPage,setInitPage] = useState(2);
  

  const dataBanners = useFeaturedBanners();
  const dataFeaturedProducts = useFeaturedProducts();
  const dataCategories = useCategories();



  useEffect(()=>{
    loadPage();
  },[dataBanners]);
  


  
  function loadPage(){
    setInitPage(2);
    setTimeout(() => {
      setInitPage(1);
      setTimeout(() => {
       setInitPage(0);
      }, 200);
    }, 1000);
  }

  function nav(path){
    window.scrollTo({
         top: 0,
         behavior: 'smooth',
    });
    setPageLoader(2);
    history(path);
    setTimeout(() => {
      setPageLoader(1);
      setTimeout(() => {
       setPageLoader(0);
      }, 500);
    }, 2000);
  }

  


  return (
    <>
      <Global />

      <Header nav={nav} />

      <PageLoader show={initPage} fixed={true} />
      
      <main className={(pageLoader > 0)? 'loading':''}>
        <PageLoader show={pageLoader} />
        {/*{getPage(pagePath)}*/}
        <Routes>
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Home banners={dataBanners} products={dataFeaturedProducts} categories={dataCategories} nav={nav} />}/>
          <Route path="products" element={<Products  categories={dataCategories} nav={nav} />}/>
          <Route path="product/:id" element={<Product nav={nav} products={dataFeaturedProducts} />}/>
          <Route path="search" element={<Search nav={nav} />} />
          <Route path="*" element={<h2 className="txtC txtS1 pT80 pB80">404</h2>} />
        </Routes> 
      </main>
      
      <Footer />
    </>
  );
}

export default App;
