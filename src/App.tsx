import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const colours = ["green1", "green2", "green3", "green4", "green5", "green6", "green7"]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (inputValue.trim()) {  // checks if empty
      setIngredients([...ingredients, inputValue]) // appends inputValue
      shuffleArray(colours)
      setInputValue('') // clears inputValue
    }
  }

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
  const saveAllIngredients = () => {
      const guysThisIsIngredients = ingredients

  }

  const makeSegments = () => {
    const totalNoIngredients = ingredients.length
    if (totalNoIngredients === 0) return null // Return null if there are no ingredients to avoid division by zero
    const angle = 360 / totalNoIngredients

    // Shuffle the colours array to ensure no two adjacent segments have the same color

    return ingredients.map((ingredient, index) => { // map goes through each ingredient in the array
      const colour = colours[index % colours.length] // cycles through colours
      const angleAdded = angle * index // calculates the rotation angle for each segment
      return (
        <g key={index} transform={`rotate(${angleAdded})`}>
          {/* The key attribute helps React identify which items have changed, are added, or are removed */}
          {/* The transform attribute applies a rotation transformation to the group */}

          <path
            className={colour}
            d={`M0,0 L100,0 A100,100 0 ${angle > 180 ? 1 : 0},1 ${100 * Math.cos((angle * Math.PI) / 180)},${100 * Math.sin((angle * Math.PI) / 180)} Z`}
          />
          {/* The <path> element defines the shape of the segment */}
          {/* The d attribute contains a series of commands to draw the path */}
          {/* M0,0: Move to the origin (center of the circle) */}
          {/* L100,0: Draw a line from the origin to the edge of the circle */}
          {/* A100,100 0 ${angle > 180 ? 1 : 0},1 ${100 * Math.cos((angle * Math.PI) / 180)},${100 * Math.sin((angle * Math.PI) / 180)} Z: Draw an arc to create the segment */}
          {/* A100,100: Draw an arc with a radius of 100 */}
          {/* 0 ${angle > 180 ? 1 : 0},1: Large-arc-flag and sweep-flag to determine how the arc is drawn */}
          {/* ${100 * Math.cos((angle * Math.PI) / 180)},${100 * Math.sin((angle * Math.PI) / 180)}: End point of the arc */}
          {/* Z: Close the path */}
          {/* className={colour}: Apply the CSS class to set the fill color */}

          <text
            x="50"
            y="10"
            transform={`rotate(${angle / 2}, 50, 10)`}
            textAnchor="middle"
            fill="white"
            fontSize="10"
          >
            {ingredient}
          </text>
          {/* The <text> element defines the text label for the segment */}
          {/* x="50" and y="10": Position the text at coordinates (50, 10) */}
          {/* transform={`rotate(${angle / 2}, 50, 10)`}: Rotate the text to align with the segment */}
          {/* textAnchor="middle": Center the text horizontally */}
          {/* fill="white": Set the text color to white */}
          {/* fontSize="10": Set the font size to 10 */}
          {/* {ingredient}: Display the ingredient text */}
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
      <svg className="circle" viewBox="-100 -100 200 200">
        {makeSegments()}
      </svg>
      {ingredients.length > 0 && (
        <label className="submitted-label">Ingredients: {ingredients.join(', ')}</label>
      )}
        <button type="submit" onClick={saveAllIngredients} >Add</button>
        </div>
  )
}

export default App