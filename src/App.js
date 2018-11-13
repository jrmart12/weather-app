import React from 'react';
import Form from './Form';
import PropTypes from "prop-types";
import axios from "axios";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      weather:undefined,
      temperature:undefined,
      locations:undefined,
      location:undefined
      }
    this.handleClick = this.handleClick.bind(this);
    }
  handleClick(event) {
    event.preventDefault();
    const locationname = event.target.nameLocation.value;
    if (locationname) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${locationname}`
        )
        .then(data => {
          const woeid = data.data[0].woeid;
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
            )
            .then(response => {
                this.setState(() => ({
                    city: response.data.title,
                    condition: response.data.consolidated_weather[0].weather_state_name,
                    temperature: response.data.consolidated_weather[0].the_temp
                  }));
            });
        })
    }
  }

  fetchLocationId = async city => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`,
    );
    const locations = await response.json();
    return locations[0].woeid;
  };
  
  fetchWeather = async woeid => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/${woeid}/`,
    );
    const { title, consolidated_weather } = await response.json();
    const { weather_state_name, the_temp } = consolidated_weather[0];
  
    return {
      location: title,
      weather: weather_state_name,
      temperature: the_temp,
    };
  };
  

render(){
  return(
    <div className="center">
              <p>{this.state.location} </p>
              <p>{this.state.weather} </p>
              <p>{this.state.temperature} </p>
              <Form city={this.handleClick}  />

      </div> 
  )
}
}
App.propTypes = {
  match: PropTypes.object.isRequired
};
export default App;


