import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ActivitiesDetail.css";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(`https://mock.apidog.com/m1/873119-854329-default/activities/${id}`);
        if (!res.ok) throw new Error("Error al obtener la actividad");
        const data = await res.json();
        setActivity(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return <p className="p-4">Cargando actividad...</p>;
  if (!activity) return <p className="p-4">No se encontró la actividad.</p>;

  return (
    <div className="p-4">
      <h1 className="activity-title">{activity.name}</h1>
      <div className="container-image">
        <div className="activity-image">
          {activity.images?.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Actividad ${index}`}
              className="rounded shadow"
            />
          ))}
          <p className="long-description">{activity.long_description}</p>
        </div>

        <div className="activity-detail">
          
          <div className="activity-info">
            <div className="row">
              <div className="col-md-8 row row-cols-2">
                <p className="col"><strong>Instructor:</strong> {activity.instructor}</p>
                <p className="col"><strong>Precio:</strong> {activity.price}€</p>
                <p className="col"><strong>Duración:</strong> {activity.duration} minutos</p>
                <p className="col"><strong>Idioma:</strong> {activity.language}</p>
                <p className="col"><strong>Categoría:</strong> {activity.category}</p>
                <p className="col"><strong>Tipo:</strong> {activity.type}</p>
                <p className="col"><strong>Cupo máximo:</strong> {activity.limit} personas</p>
                <p className="col"><strong>Material incluido:</strong> {activity.includes_material ? "Sí" : "No"}</p>
              </div>


              <div className="col-6 col-md-4">
                <div className="mb-6">
                  <h2 className="fechas-title">Fechas disponibles:</h2>
                  <ul className="list-disc list-inside">
                    {activity.available_dates?.map((date, index) => (
                      <li key={index}>{new Date(date).toLocaleDateString()}</li>
                    ))}
                  </ul>
                </div>

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => navigate(`/activities/${activity.activity_id}/reserve`)}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default ActivityDetail;
