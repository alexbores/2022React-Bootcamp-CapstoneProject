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
import Cart from './pages/Cart/Cart';

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
  const [cart,setCart] = useState([]);
  

  const dataBanners = useFeaturedBanners();
  const dataFeaturedProducts = useFeaturedProducts();
  const dataCategories = useCategories();
  

  // console.log(dataCategories);

  useEffect(()=>{
    loadPage();
  },[dataBanners]);
  

  function getLink(data){
        const path = window.location.pathname;
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        let url = window.location.pathname;

        if(!data){
          return url+queryString;
        }

        let first = true;
        function getJoin(){
            if(first){
              first = false;
              return '?';
            }
            else{
              return '&';
            }
        }
        let found = false;
        
        for(let entry of params.entries()) {
          if(Object.keys(data)[0] === entry[0]  ){
            if(data[Object.keys(data)[0]] !== ''){
              url += `${getJoin()}${entry[0]}=${data[Object.keys(data)[0]]}`;
            }
            found = true;
          }
          else{
            url += `${getJoin()}${entry[0]}=${entry[1]}`;
          }
        }

        if(!found){
          url += `${getJoin()}${Object.keys(data)[0]}=${data[Object.keys(data)[0]]}`;
        }


        return url;
    }
  
  function loadPage(){
    setInitPage(2);
    setTimeout(() => {
      setInitPage(1);
      setTimeout(() => {
       setInitPage(0);
      }, 200);
    }, 1000);
  }

  function nav(path,show=true){
    if(show){
      window.scrollTo({
           top: 0,
           behavior: 'smooth',
      });
      setPageLoader(2);
    }
    history(path);
    if(show){
      setTimeout(() => {
        setPageLoader(1);
        setTimeout(() => {
         setPageLoader(0);
        }, 500);
      }, 2000);
    }
  }

  
  function addCart(data){
     let tempData = [...cart];
     let found = false;
     console.log(data);
     if(data?.id){
       tempData.map(p => {
         if(p.id === data.id){
           p.qty = parseInt(p.qty) + parseInt(data.qty);
           found = true;
         }
       });
       if(!found){
         tempData.push(data);
       }
     }
     setCart(tempData);
  }

  useEffect(()=>{
    console.log(cart);
  },[cart]);
  // function removeCart(data){
  //    tempData = [...cart];
  //    if(data.id){

  //    }
  //    setCart(tempData);
  // }

  return (
    <>
      <Global />

      <Header nav={nav} cart={cart} />

      <PageLoader show={initPage} fixed={true} />
      
      <main className={(pageLoader > 0)? 'loading':''}>
        <PageLoader show={pageLoader} />
        {/*{getPage(pagePath)}*/}
        <Routes>
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Home addCart={addCart} getLink={getLink} banners={dataBanners} products={dataFeaturedProducts} categories={dataCategories} nav={nav} getLink={getLink}/>}/>
          <Route path="products" element={<Products addCart={addCart} getLink={getLink} categories={dataCategories} nav={nav} />}/>
          <Route path="product/:id" element={<Product addCart={addCart} nav={nav} products={dataFeaturedProducts} />}/>
          <Route path="search" element={<Search addCart={addCart} nav={nav} getLink={getLink} />} />
          <Route path="cart" element={<Cart cart={cart} nav={nav} getLink={getLink} />} />
          <Route path="*" element={<h2 className="txtC txtS1 pT80 pB80">404</h2>} />
        </Routes> 
      </main>
      
      <Footer />
    </>
  );
}

export default App;
