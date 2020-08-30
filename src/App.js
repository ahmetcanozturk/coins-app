import React, {Component} from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import './css/App.css';

import { Home } from './components/Home';
import { MarketChart } from './components/MarketChart';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <Layout>
              <Route exact path='/' component={Home} />
              <Route path='/market-chart' component={MarketChart} />
          </Layout>
      );
  }
}
