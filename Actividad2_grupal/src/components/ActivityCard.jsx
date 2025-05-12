import React from 'react';
import { Link } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card">
      <img src={activity.imageUrl} alt={activity.name} />
      <div className="activity-card-content">
        <h2>{activity.name}</h2>
        <p>{activity.description}</p>
        <Link to={`/actividad/${activity.id}`}>
          <button className="button-primary">Ver detalles</button>
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;