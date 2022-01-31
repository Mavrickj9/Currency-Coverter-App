import React from "react";
import ReactDom from "react-dom";
import "./stylesheets/index.css";
import ConverterBox from "./components/converter";

function App() {
  return (
    <div>
      <div className="max-w-4xl m-auto pb-6 pt-14">
        <ConverterBox />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDom.render(<App />, rootElement);
