import React, { useContext } from 'react';
import styled from 'reshadow';
import Header from '../Header';
import Footer from '../Footer';
import ThemeContext from '../ThemeContext';
import styles from './styles.css';
import * as themes from '../../styles/themes';

export default ({
  children,
}) => styled(console.log('themes', themes.dark) || themes[useContext(ThemeContext)], styles)(
  <>
    <Header />
    <content>
      {children}
    </content>
    <Footer />
  </>
);
