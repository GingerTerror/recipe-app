import axios from "axios";
import { useState } from 'react'
import './App.css'

function App() {
    // const [ingredients, setIngredients] = useState<string>("");
    const [meal, setMeal] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [inputValue, setInputValue] = useState('')
    const [ingredients, setIngredients] = useState<string[]>([])
    const [segmentColors, setSegmentColors] = useState<string[]>([])
    const [isSpinning, setIsSpinning] = useState(false)
    const colours = ["green0", "green1", "green2", "green3", "green4", "green5"]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (inputValue.trim()) {  // checks if empty
      setIngredients([...ingredients, inputValue]) // appends inputValue

      // Determine the color for the new ingredient
      const newIndex = ingredients.length
      let newColor
      if ((newIndex + 1) % 6 === 1) {
        // Randomly pick a color from colours[1] to colours[4]
        newColor = colours[Math.floor(Math.random() * 4) + 1]
      } else {
        // Cycle through colours
        newColor = colours[newIndex % colours.length]
      }
      setSegmentColors([...segmentColors, newColor]) // append the new color

      setInputValue('') // clears inputValue
    }
  }

  const saveAllIngredients = () => {
    console.log("YAY success")
    setIsSpinning(true)  // Start spinning
    setTimeout(() => {
      setIsSpinning(false)  // Stop spinning after 2 seconds
      console.log("Spinning finished! Calling new function...")
      newFunction()  // Call whatever function you want
    }, 2000)  // 2 seconds
  }

  // const newFunction = () => {
  //   // Add any additional functionality here
  // }
  const newFunction = async () => {
    setLoading(true);
    setError("");
    setMeal("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-meal", {
        ingredients: ingredients.map((item) => item.trim()),
      });
      setMeal(response.data.meal);
    } catch (error) {
      console.error("Error generating meal:", error);
      setError("Failed to fetch meal suggestion. Try again.");
    } finally {
      setLoading(false);
    }
  };


  const makeSegments = () => {
    const noIngredients = ingredients.length
    if (noIngredients === 0) return null // Return null if there are no ingredients to avoid division by zero
    const angle = 360 / noIngredients

    return ingredients.map((ingredient, index) => { // map goes through each ingredient in the array
      const colour = segmentColors[index] // use the pre-determined color
      const angleAdded = angle * index // calculates the rotation angle for each segment
      const textAngle = angleAdded + angle / 2 // calculates the angle for the text
      return (
        <g key={index} transform={`rotate(${angleAdded})`}>

          <path
            className={colour}
            d={`M0,0 L100,0 A100,100 0 ${angle > 180 ? 1 : 0},1 ${100 * Math.cos((angle * Math.PI) / 180)},${100 * Math.sin((angle * Math.PI) / 180)} Z`}
            stroke="black"
            strokeWidth="1"
          />
          <text
            x="50"
            y="10"
            transform={`rotate(${textAngle}, 50, 10)`}
            textAnchor="middle"
            fill="white"
            fontSize="10"
          >
            {ingredient}
          </text>
        </g>
      )
    })
  }

  return (
    <div className="home-container">
      <h1>Meal Matcha</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter text"
        />
        <button type="submit">Add</button>
      </form>
      <svg className={`circle ${isSpinning ? "spin" : ""}`} viewBox="-100 -100 200 200">
        {makeSegments()}
      </svg>
      {ingredients.length > 0 && (
        <label className="submitted-label">Ingredients: {ingredients.join(', ')}</label>
      )}
      <button type="submit" onClick={saveAllIngredients}>Submit All</button>

        {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {meal && (
        <p>
          <strong>Suggested Meal:</strong> {meal}
        </p>
      )}
    </div>
  )
}

export default App