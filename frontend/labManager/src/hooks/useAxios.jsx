import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxios(url, defaultValue = {}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        let ignore = false;
        axios
          .get(url)
          .then((json) => {
            if (!ignore) {
                setItems(json.data.data);
            }
          })
          .catch((error) => setItems(error.message));
    
        return () => {
          ignore = true;
        };
      }, [url]);
    return items;
}