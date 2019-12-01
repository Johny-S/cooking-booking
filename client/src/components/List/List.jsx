import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import { Card } from 'react-materialize'
import './List-style.css'

export default class List extends Component {
  constructor() {
    super()
    this.state = {
      venues: [],
    }
  }

  componentDidMount = async () => {
    const resp = await fetch('http://localhost:5000/api/venues');
    let json = await resp.json();
    this.setState({venues: json})
    
    
  }

  render() {
    return(
      <div>
        <ul>
          {this.state.venues.map((venue) => 
            <li key={venue.id}>
              <div className='venue'>

                <div className='infoContainer'>
                  <Link to={`/venues/${venue.id}`}>
                    {venue.name}<br/>
                  </Link>
                  {venue.adress}
                  <p>
                    price: 
                  </p>
                </div>

                <div className='picContainer'>
                  <img className='venueListPic' src={venue.img} alt="картинка будет здесь"/>
                </div>

              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }

}