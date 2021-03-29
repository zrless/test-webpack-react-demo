import React from "react";
import ReactDom from "react-dom";
import App from "./App"
import './style.less'
if(module.hot) {
  module.hot.accept(error => {
    if(error) {
      console.log('HMR出Bug了');
    }
  })
}
ReactDom.render(<App />, document.getElementById("app"));

