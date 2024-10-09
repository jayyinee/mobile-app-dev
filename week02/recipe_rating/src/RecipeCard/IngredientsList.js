import React from 'react'
import './styles.css'
// HW: Apply CSS styling

export default function IngredientsList(props) {
  const {ingredients} = props

  return (
    <div className="ingredients_list">
      <h3 className="list_title">Ingredients</h3>
      <ul>
        {ingredients.map((i, index) => (
          <li key={index} className="list_item">
            <span className="measure">{i.measure}</span>
            <span>{i.item}</span>
            </li>
        ))}
      </ul>
    </div>
  )
}