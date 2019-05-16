import React from 'react';
import styled from 'reshadow';
import styles from './styles.css';

export default ({
  artist,
  explicitness,
  imageUrl,
  title,
  url,
}) => styled(styles)(
  <a
    href={url}
    target="_blank"
    rel="nofollow noopener"
    use:explicitness={explicitness}
  >
    <img src={imageUrl} />
    <title as="h3">{`${artist} — ${title}`}</title>
  </a>
);
