import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useSearch({qWord,page}) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [searchs, setSearch] = useState(() => ({
    data: {},
    isLoading: true,
  }));



  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getSearch({qWord,page}) {
      try {
        setSearch({ data: {}, isLoading: true });
        let type= `&q=${encodeURIComponent(`[[at(document.type, "product")]]`)}`;
        let search = (qWord)? `&q=${encodeURIComponent(`[[fulltext(document, "${qWord}")]]`)}` : '';
        let paged = (page)? page : 1;
        const response = await fetch(
           `${API_BASE_URL}/documents/search?ref=${apiRef}${type}${search}&lang=en-us&pageSize=12&page=${paged}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setSearch({ data, isLoading: false, reFetch: ({qWord,page})=>{getSearch({qWord,page})} });
      } catch (err) {
        setSearch({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getSearch({qWord,page});

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return searchs;
}
