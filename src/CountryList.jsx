// src/CountryList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CountryList.css'; // Importiere die CSS-Datei

function CountryList() {
    // suchfilter state hinzufügen
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);
// loading und error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Gefiltertes Array basierend auf dem filter-String erstellen
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

  return (
// TODO: Suchfeld einfügen
    <div className="country-list">
      <input
        type="text"
        className="country-list input"
        placeholder="Search for a country..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

        <ul className="country-list .grid-list">
            {filteredCountries.map(country => (
            <li key={country.cca3} className="country-list .card">
                {country.name.common} - {country.capital ? country.capital[0] : 'No capital'}
            </li>
            ))}
        </ul>
    </div>
  );
}
export default CountryList;