import { useState, useEffect, useCallback } from "react";

async function sendHTTPRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request.",
    );
  }
  return resData;
}

export function useHttp(url, config, initialData) {
  // Request takes some time. Get an initialState value.
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  // To prevent infinite loop between useEffect and recreation of function
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHTTPRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Failed to send request.");
      }
      setIsLoading(false);
    },
    [url, config],
  );

  // Can expose sendRequest to the calling component, but also
  // have this hook call it for the component.
  useEffect(() => {
    // Gets called whenever the component that uses this loads
    // To prevent this, add a check (i.e., we don't want this behaviour
    // for the checkout component)
    if ((config && (config.method == "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]); // sendRequest is defined outside, so it's a dependency

  // Expose sendRequest function so that any component can make
  // a use of it anytime they want
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
