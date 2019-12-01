import React, { Component } from 'react';
import image from '../../images/mk.jpg';

class CardTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <img style={{ width: '800px' }} src={image} alt='' />;
  }
}

export default CardTitle;
