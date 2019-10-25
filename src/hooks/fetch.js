import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  firstImgUrl: null
};

const fetchReducer = (curFetchState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        firstImgUrl: null
      };
    case "RESPONSE":
      return {
        ...curFetchState,
        loading: false,
        firstImgUrl: action.firstImgUrl
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };

    default:
      throw new Error("Should not be here!");
  }
};

const useFetch = () => {
  const [fetchState, dispatchFetch] = useReducer(fetchReducer, initialState);

  const sendRequest = useCallback((url, method) => {
    dispatchFetch({ type: "SEND" });
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        dispatchFetch({
          type: "RESPONSE",
          firstImgUrl: responseData.data[0].images.original.url
        });
      })
      .catch(error => {
        dispatchFetch({
          type: "ERROR",
          errorMessage: "Something went wrong!"
        });
      });
  }, []);

  return {
    isLoading: fetchState.loading,
    firstImgUrl: fetchState.firstImgUrl,
    error: fetchState.error,
    sendRequest: sendRequest
  };
};

export default useFetch;
