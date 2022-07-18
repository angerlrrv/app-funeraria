import { useState } from 'react';
import { Api } from './../_mock/config';
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchApi = async (data, Url) => {
    setLoading(true);
    try {
     
      const abortController = new AbortController();
      const { signal } = abortController;
      const res = await fetch(`${Api}${Url}`, {
        method: 'POST',
        signal: signal,
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        let err = new Error('Error en la peticion Fetch');
        err.status = res.status || '00';
        err.statusText = res.statusText || 'Ocurrio un Error';
        throw err;
      }
      const jsonData = await res.json();
      const { sqlMessage, error } = jsonData;
      
      if (!signal.aborted && error === undefined) {
        setLoading(false);
        const { estatus } = jsonData;
        setData(estatus);
        setError(null);
       console.log(jsonData);
      } else {
       
        
        setLoading(false);
        setError(error || sqlMessage);
         console.log(error || sqlMessage);
      }
    } catch (error) {
     
      setData(null);
      setLoading(false);
      setError('Error Al Insertar Datos');
    }
  };
  return { loading, data, fetchApi, error };
};

export default useApi;
