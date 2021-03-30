import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./style.less";
if (module.hot) {
  module.hot.accept((error) => {
    if (error) {
      console.log("HMR出Bug了");
    }
  });
}
const Index = () => {
  return (
    <div>
      <h1>index.html</h1>
      <App />
    </div>
  );
};
ReactDom.render(<Index />, document.getElementById("app"));
