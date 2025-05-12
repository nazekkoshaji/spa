import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.simulada.com/activities/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching activity details');
        }
        const data = await response.json();
        setActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return <div>Loading activity...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p><strong>Duration:</strong> {activity.duration} hours</p>
      <p><strong>Price:</strong> ${activity.price}</p>
    </div>
  );
};

export default ActivityDetail;