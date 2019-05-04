import React from 'react';
import styled from 'reshadow';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.css';

export default ({
  children,
}) => styled(styles)(
  <>
    <Header />
    <content>
      {children}
    </content>
    <Footer />
  </>
);
