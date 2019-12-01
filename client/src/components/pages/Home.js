import React, { Component } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import ListVenues from '../Venue/ListVenues';
import MapWrap from '../Map/MapWrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <FilterBar />

        <div className='ListMap'>
          <div className='ListContainer'>
            <div style={{height: '790px', width:'100%', 'overflow-y': 'scroll'}}>
              <ListVenues />
            </div>
          </div>
          <div className='MapContainer'>
            <MapWrap />
          </div>
        </div>
      </div>
    );
  }
}
