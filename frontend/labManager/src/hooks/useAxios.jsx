import { useState, useEffect } from 'react';
import axios from 'axios';

//Custom hook to fetch information using axios and useEffect
export function useAxios(url, defaultValue = {}) {

    const [items, setItems] = useState([]);

    //contains the fetching
    useEffect(() => {
        let ignore = false;
        axios
          .get(url)
          .then((json) => {
            if (!ignore) {
                setItems(json.data.data);
            }
          })
          //Catches for error
          .catch((error) => setItems(error.message));

          //cleanup for the useEffecthook
        return () => {
          ignore = true;
        };
      }, [url]);
      //Returns the information featch from the API
    return items;
}