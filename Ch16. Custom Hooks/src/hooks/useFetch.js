import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    data,
    setData,
    isFetching,
    error
  }
}
