import React from 'react';
import styled from 'reshadow';
import styles from './styles.css';

export default ({
  artist,
  imageUrl,
  title,
  url,
}) => styled(styles)(
  <a
    href={url}
    target="_blank"
    rel="nofollow noopener"
  >
    <img src={imageUrl} />
    <h3>{`${artist} — ${title}`}</h3>
  </a>
);
