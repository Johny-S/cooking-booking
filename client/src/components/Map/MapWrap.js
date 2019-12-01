import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getVenuesAC
} from '../../actions/venueActions';
import Map from './Map';
import Axios from 'axios';

class MapWrap extends Component {
  state = {}
  componentDidMount() {
    this.props.getVenues();
    Axios.get('/api/key').then(resp => this.setState({ apiKey: resp.data.key }))
  }

  showResults = () => {
    return this.props.filtered || this.props.venues;
  };

  render() {
    return <Map venues={this.showResults()} myKey={this.state.apiKey} />;
  }
}

function mapStateToProps(state) {
  return {
    venues: state.venues.venues,
    filtered: state.venues.filtered
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getVenues: () => dispatch(getVenuesAC())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapWrap);
