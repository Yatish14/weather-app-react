import { useState } from "react";

const api = {
  key: "d15270c0887def95d1ba1bac5e3d42b2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [inputValue,setInputvalue] = useState("");
  const [weatherDetails,setWeatherdetails] = useState({});
  const search = (e) => {
    if(e.key === 'Enter')
    {
      fetch(`${api.base}weather?q=${inputValue}&units=metric&APPID=${api.key}`).then((res) => res.json()).then((data) => {
        setWeatherdetails(data);
        setInputvalue('');
        console.log(weatherDetails);
      });
    }
  }
  const getCurrentDate = (d) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  };
  return (
    <div className={(typeof weatherDetails.main != "undefined") ? ((weatherDetails.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search">
          <h2>Weather Report</h2>
          <input 
            type = "text"
            className="searchBox"
            onChange={(e) => {setInputvalue(e.target.value)}}
            value = {inputValue}
            onKeyPress = {search}
            placeholder="Enter Location..."
          />
        </div>
        {(typeof weatherDetails.main != "undefined") ? (
          <div>
            <div className="location-wrap">
              <div className="location">{weatherDetails?.name}, {weatherDetails?.sys.country}</div>
              <div className="date">{getCurrentDate(new Date())}</div>
            </div>
            <div className="weatherReport">
              <div className="temp">{Math.round(weatherDetails?.main.temp)}°C</div>
              <div className="weather">{weatherDetails?.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
