import { useState, useEffect } from 'react';

export const useFilteredActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://api.simulada.com/activities');
        if (!response.ok) {
          throw new Error('Error fetching activities');
        }
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
};
