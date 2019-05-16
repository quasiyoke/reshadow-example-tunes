import React, { Component } from 'react';
import styled from 'reshadow';
import Tune from '../Tune';
import styles from './styles.css';

export default class Tunes extends Component {
  render() {
    const { tunes } = this.props;
    if (tunes === undefined) {
      return this.renderLoading();
    }
    if (!Array.isArray(tunes)) {
      return this.renderError();
    }
    if (tunes.length < 1) {
      return this.renderEmpty();
    }
    return this.renderTunes();
  }

  renderError = () => styled(styles)(
    <notification use:error>
      Error 😩
    </notification>
  );

  renderEmpty = () => styled(styles)(
    <notification>
      Nothing found 🙁
    </notification>
  );

  renderLoading = () => styled(styles)(
    <notification>
      Please wait 🤞
    </notification>
  );

  renderTunes = () => styled(styles)(
    <tunes>
      {this.props.tunes.map(this.renderTune)}
    </tunes>
  );

  renderTune = ({
    artistName,
    artworkUrl100,
    collectionCensoredName,
    collectionExplicitness,
    collectionViewUrl,
    trackCensoredName,
    trackExplicitness,
    trackViewUrl,
  }) => styled(styles)(
    <Tune
      explicitness={trackExplicitness || collectionExplicitness}
      key={trackViewUrl || collectionViewUrl}
      artist={artistName}
      imageUrl={artworkUrl100}
      title={trackCensoredName || collectionCensoredName}
      url={trackViewUrl || collectionViewUrl}
    />
  );
}
