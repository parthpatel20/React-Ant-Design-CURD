import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LayoutPage from './pages/layout'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LayoutPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
