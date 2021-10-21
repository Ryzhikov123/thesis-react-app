import { useEffect, useState } from 'react';
import { getRequest } from '../utils';

export const useFetch = (request: string): [any] => {
  const [value, setValue] = useState<any>(null);
  useEffect(() => {
    getRequest(`${request}`)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      .then((res) => setValue(res.data))
      .catch((err) => console.log(err));
  }, [request]);
  return value;
};
