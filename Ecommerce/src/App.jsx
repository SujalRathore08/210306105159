import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AllProductsPage} />
          <Route path="/products/:productId" component={ProductDetailPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
