import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await fetch(
        `http://localhost:5000/weather?city=${city}`
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <form onSubmit={handleSearch} className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearch}>
          Clear
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>
          <p><b>Temperature:</b> {weather.main?.temp} °C</p>
          <p><b>Condition:</b> {weather.weather?.[0]?.description}</p>
          <p><b>Humidity:</b> {weather.main?.humidity}%</p>
          <p><b>Wind:</b> {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;