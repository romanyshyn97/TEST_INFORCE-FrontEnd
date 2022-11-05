import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";

import AppHeader from "./Components/AppHeader/AppHeader";
import ProductsList from "./Components/ProductsList/ProductsList";
import NewProduct from "./Components/NewProduct/NewProduct";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<ProductsList  />}/>
            
            
         
        </Routes>
      </main>
    </Router>
  );
};

export default App;
