import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

import { makeServer } from './api/mockserver'
makeServer({ environment: 'development' })

ReactDOM.render(<App />, document.getElementById("root"));