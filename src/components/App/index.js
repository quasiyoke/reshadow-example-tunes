import React from 'react';
import { hot } from 'react-hot-loader/root';
import Catalog from '../Catalog';
import Page from '../Page';

const App = () => (
  <Page>
    <Catalog />
  </Page>
);

export default hot(App);
