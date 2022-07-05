import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProducts({qWord,page}) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [products, setProducts] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getProducts({qWord,page}) {
      function setArray(word){
        let splited = word.replaceAll(',', '","');
        let temp = `["${splited}"]`;
        return temp;
      }

      try {
        setProducts({ data: {}, isLoading: true });
        let type= `&q=${encodeURIComponent(`[[at(document.type, "product")]]`)}`;
        let search = (qWord)? `&q=${encodeURIComponent(`[[any(my.product.category, ${setArray(qWord)})]]`)}` : '';
        // [has(my.page.description)]
        // [any(document.type, ["product", "blog-post"])]
        let paged = (page)? page : 1;
        const response = await fetch(
           `${API_BASE_URL}/documents/search?ref=${apiRef}${type}${search}&lang=en-us&pageSize=12&page=${paged}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setProducts({ data, isLoading: false, reFetch: ({qWord,page})=>{getProducts({qWord,page})} });
      } catch (err) {
        setProducts({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getProducts({qWord,page});

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return products;
}
