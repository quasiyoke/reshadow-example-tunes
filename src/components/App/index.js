import React from 'react';
import { hot } from 'react-hot-loader';
import Catalog from '../Catalog';
import Page from '../Page';

const App = () => (
  <Page>
    <Catalog />
  </Page>
);

export default hot(module)(App);
