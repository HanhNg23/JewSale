import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "stores";

const useFetchV2 = ({ fetchFunction }, ...args) => {
  const reFetch = useAppStore((state) => state.isRefecth);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFetchFunction = useCallback(fetchFunction, [...args]);

  useEffect(() => {
    setLoading(true);
    memoizedFetchFunction()
      .then((res) => {
        setLoading(false);
        setResponse(res);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [memoizedFetchFunction, reFetch]);

  return [response, loading, error];
};

export default useFetchV2;
