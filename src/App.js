import React from 'react';
import PropTypes from "prop-types";
import axios from "axios";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      weather:undefined,
      temperature:undefined,
      location:undefined
      }
    this.handleClick = this.handleClick.bind(this);
    }
  handleClick(event) {
    event.preventDefault();
    const city = event.target.citylocation.value;
    if (city) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`
        )
        .then(data => {
          const woeid = data.data[0].woeid;
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
            )
            .then(response => {
                this.setState(() => ({
                    location: response.data.title,
                    weather: response.data.consolidated_weather[0].weather_state_name,
                    temperature: response.data.consolidated_weather[0].the_temp
                  }));
            })
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(err => {
            this.setState(() => ({
                location: 'no se encontro',
                weather: '',
                temperature: ''
              }));
          console.log(err.message);
        });
    }
  }

  

render(){
  return(
    <div className="center">
    <div>
              <p>{this.state.location} </p>
              <p>{this.state.weather} </p>
              <p>{this.state.temperature} </p>
              </div>
              <div>
              <form onSubmit = {this.handleClick}>
                    <input type="text" name="citylocation" placeholder="Location..."/>
                    <button>Search Weather</button>
              </form>
      </div>
      </div> 
  )
}

}

export const fetchLocationId = async city => {
  const response = await fetch(`location/search/?query=${city}`);
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  const response = await fetch(`location/${woeid}/`);
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp
  };
};
App.propTypes = {
  match: PropTypes.object.isRequired
};
export default App;


