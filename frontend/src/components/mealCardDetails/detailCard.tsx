import React from 'react';
import './detailCard.css';

interface DetailCardProps {
  mealName: string;
  mealThumb: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: string[];
  onClose: () => void;
}

const DetailCard: React.FC<DetailCardProps> = ({
  mealName,
  mealThumb,
  category,
  area,
  instructions,
  ingredients = [],
  onClose,
}) => {
  return (
    <div className="detail-card">
      <div className="detail-card-header">
        <h2>{mealName}</h2>
        <button className="detail-card-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <img src={mealThumb} alt={mealName} className="detail-card-image" />
      <div className="detail-card-body">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Cuisine:</strong> {area}</p>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p>{instructions}</p>
      </div>
    </div>
  );
};

export default DetailCard;
