import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CreateBook from './components/Books/BookForm';
import Books from './containers/Books/Books';
import Auth from './containers/Auth/Auth';
import SignUp from './containers/Signup/Signup'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/create-book" component={CreateBook} />
            <Route path="/books" component={Books} />
            <Route path="/auth" component={Auth} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" exact component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
