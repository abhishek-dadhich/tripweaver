import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../config";

function DestinationSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("tourism");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Search query cannot be empty.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const url = `${API_BASE}/destination/search?query=${encodeURIComponent(
        query
      )}&category=${encodeURIComponent(category)}`;

      const res = await axios.get(url);

      const normalized = (res.data || []).map((d) => ({
        name: d.name || "Unknown Place",
        formatted: d.address || "",
        categories: d.category || "",
        latitude: d.latitude,
        longitude: d.longitude
      }));

      setResults(normalized);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch destinations. Check backend or network."
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "700px", margin: "auto", paddingTop: "40px" }}>
      <h2>Search Destinations</h2>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search a place (e.g., Paris, Goa)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        <option value="tourism">Tourism</option>
        <option value="tourism.sights">Tourist Spots</option>
        <option value="entertainment">Entertainment</option>
        <option value="accommodation">Hotels</option>
        <option value="catering">Restaurants</option>
      </select>

      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          padding: "10px 20px",
          width: "100%",
          background: "#4a4aff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {results.length === 0 && !loading && <p>No results yet.</p>}

        {results.map((d, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px"
            }}
          >
            <h3>{d.name}</h3>
            <p>{d.formatted}</p>
            <p>
              <strong>Categories:</strong> {d.categories || "N/A"}
            </p>
            <p>
              <strong>Coordinates:</strong>{" "}
              {d.latitude && d.longitude
                ? `${d.latitude}, ${d.longitude}`
                : "Not available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationSearch;