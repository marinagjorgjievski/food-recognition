import React from 'react';
import './FoodRecognition.css';

const FoodRecognition = ({ ingredients, imageURL }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageURL} width='500px' heigh='auto'/>
        <div className='concepts'>
          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index , p) =>
              <li key={index}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FoodRecognition;
