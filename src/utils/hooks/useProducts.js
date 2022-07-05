import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProducts(page) {
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

    async function getProducts(page) {
      try {
        setProducts({ data: {}, isLoading: true });
        let paged = (page)? page : 1;
        const response = await fetch(
           `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent('[[at(document.type, "product")]]')}&lang=en-us&pageSize=12&page=${paged}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setProducts({ data, isLoading: false, reFetch: (p)=>{getProducts(p)} });
      } catch (err) {
        setProducts({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getProducts(page);

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return products;
}
