import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenerateMeal = async () => {
    setLoading(true);
    setError("");
    setMeal("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-meal", {
        ingredients: ingredients.split(",").map((item) => item.trim()),
      });
      setMeal(response.data.meal);
    } catch (error) {
      console.error("Error generating meal:", error);
      setError("Failed to fetch meal suggestion. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Meal Generator</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ padding: "10px", width: "60%" }}
      />
      <button
        onClick={handleGenerateMeal}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Generate Meal
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {meal && (
        <p>
          <strong>Suggested Meal:</strong> {meal}
        </p>
      )}
    </div>
  );
};

export default App;
