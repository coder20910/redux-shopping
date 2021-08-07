import React from "react";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import CartPage from "./Components/cart/CartPage";
import HomePage from "./Components/homepage/HomePage";
import NavBar from "./Components/navbar/NavBar";
import SingleItem from "./Components/product/SingleItem";

import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar/>

        <Switch>
          <Route path="/cart" exact component={CartPage}></Route>
          {store.currItem === null ?  (
            <Redirect to="/" />
          ) : (
            <Route exact path="/product/:id" component={SingleItem} />
          )}
          <Route path="/" exact component={HomePage}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;