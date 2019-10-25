import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import useFetch from "./hooks/fetch";

import "./styles.css";

function App() {
  const { isLoading, error, firstImgUrl, sendRequest } = useFetch();

  const a_key = "YOUR_KEY";
  const query = "dog";

  useEffect(() => {
    sendRequest(
      `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${a_key}&limit=1`,
      "GET"
    );
  }, []);

  useEffect(() => {}, [firstImgUrl]);

  const loadingGif =
    "https://media2.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif?cid=790b761126dfefd5891485d153130ccaa38cff6edde29fea&rid=giphy.gif";

  const errorGif = "https://media.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif";

  let content = "";

  content = error
    ? errorGif
    : !firstImgUrl && isLoading
    ? loadingGif
    : firstImgUrl;

  return (
    <div className="app">
      <h2>Render the API response within the container below.</h2>
      <pre id="response-container" />
      <div>
        <div>{<img src={content} alt="content" />}</div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
