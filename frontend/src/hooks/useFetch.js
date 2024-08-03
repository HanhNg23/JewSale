import { useAppStore, useAuthStore } from "stores";
import { useState, useEffect, useCallback } from "react";

const useFetch = (func, ...args) => {
  const reFetch = useAppStore((state) => state.isRefecth);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFunc = useCallback(func, [...args]);
  useEffect(() => {
    setLoading(true);
    setError(null);
    const callback = (error, data, res) => {
      console.log(res);
      console.log(data);
      setLoading(false);
      if (error) {
        setError(
          error.message || "Sorry! Something went wrong. App server error"
        );
      } else {
        if (
          data !== null &&
          typeof data === "object" &&
          Object.keys(data).length === 0
        ) {
          // Nếu data là một đối tượng rỗng
          setResponse(res.body);
        } else {
          // Nếu data không phải là đối tượng rỗng, hoặc là một giá trị khác kiểu đối tượng
          setResponse(data);
        }
      }
    };
    if (args) {
      memoizedFunc(...args, callback);
    } else {
      memoizedFunc(callback);
    }
  }, [memoizedFunc, reFetch]);

  return { loading, error, response };
};

export default useFetch;
