import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/weather/${location}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div>
            <h1>Weather Forecast</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData && (
                <div>
                    <h2>Forecast for {weatherData.city.name}</h2>
                    <ul>
                        {weatherData.list.map((item, index) => (
                            <li key={index}>
                                {new Date(item.dt * 1000).toLocaleDateString()}: {item.weather[0].description}, Temp: {item.main.temp}°C
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
