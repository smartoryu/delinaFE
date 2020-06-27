import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Navbar";
import ManageProduct from "./pages/ManageAdmin/ManageProduct";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path={"/"} component={Home} exact />
            <Route path={"/manageProduct"} component={ManageProduct} exact />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
