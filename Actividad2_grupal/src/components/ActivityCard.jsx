import { Link } from "react-router-dom";
import "./ActivityCard.css";

const ActivityCard = ({ activity }) => {
  if (!activity || !activity.activity_id || !activity.name) {
    return <div className="p-2 border text-red-500">Actividad inválida</div>;
  }

  return (
    <div className="activity-card">
      <img
        src={activity.images?.[0]}
        alt={activity.name}
        className="activity-card-image"
      />
      <div className="activity-card-content">
      <h2 className="activity-card-title">{activity.name}</h2>
      <p className="activity-card-description">
        {activity.short_description
          ? activity.short_description.slice(0, 100)
          : "Sin descripción."}
      </p>
      <Link
        to={`/activities/${activity.activity_id}`}
        className="activity-card-link"
      >
        Ver más
      </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
