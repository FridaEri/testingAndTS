import './mealCard.css'

interface MealCardProps {
  mealName: string;
  mealThumb: string;
  category: string;
  area: string;
  onViewDetails: () => void; // Ensure this prop is passed
}

const MealCard: React.FC<MealCardProps> = ({
  mealName,
  mealThumb,
  category,
  area,
  onViewDetails,
}) => {
  return (
    <div className="meal-card">
      <img src={`${mealThumb}/preview`} alt={mealName} className="meal-card-image" />
      <div className="meal-card-info">
        <h3>{mealName}</h3>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Cuisine:</strong> {area}</p>
        <button className="meal-card-button" onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default MealCard;
