import { useFilteredActivities } from '../hooks/useFilteredActivities';
import ActivityCard from '../components/ActivityCard';

const Activities = () => {
  const { activities, loading, error } = useFilteredActivities();

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <div>
      <h1>Lista de Actividades</h1>
      <div>
        {activities.map((activity) => (
          <ActivityCard key={activity.activity_id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;
