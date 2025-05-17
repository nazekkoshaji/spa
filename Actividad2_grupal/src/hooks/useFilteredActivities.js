import { useState, useEffect } from 'react';
import { fetchActivities } from "../api/api";

export const useFilteredActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActivities = async () => {
      setLoading(true);
      try {
        const response = await fetchActivities();
        setActivities(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getActivities();
  }, []);

  return { activities, loading, error };
};
