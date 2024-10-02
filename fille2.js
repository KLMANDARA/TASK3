const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await axios.get(`http://localhost:5000/weather/${latitude},${longitude}`);
            setWeatherData(res.data);
        });
    }
};

// Call this function when the component mounts
useEffect(() => {
    getCurrentLocation();
}, []);
