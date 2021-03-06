import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/home/Landing";

import "./reset.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;
