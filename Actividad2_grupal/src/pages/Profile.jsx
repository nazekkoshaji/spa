import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useUsuario from "../hooks/useUsuario";
import "./Profile.css";
import { Link } from "react-router-dom";
import { deleteReservation } from "../api/api";

const url = "https://mock.apidog.com/m1/873119-854329-default";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { reservas, setReservas, activities, loading } = useUsuario(user);

  if (!user) return <p>No hay usuario autenticado.</p>;

  const handleLogout = () => {
    logout();
    navigate("/"); // te redirige al inicio
  };

  const confirmDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar esta reserva?"
    );
    if (!confirm) return;
    try {
      await deleteReservation(id);
      setReservas((prev) =>
        prev.filter((reserva) => reserva.reservation_id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar la reserva.");
    }
  };

  const inforeservations = () => {
    if (reservas.length === 0) {
      return <p>No tienes ninguna reserva</p>;
    } else {
      return (
        <div className="accordion" id="accordionExample">
          {reservas.map((reserva, index) => (
            <div className="accordion-item" key={reserva.reservation_id}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {activities[index].name} - {reserva.selected_date}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {activities[index].short_description}
                  </p>
                  <p>
                    <strong>Comentarios:</strong> {reserva.reservation_comments}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link
                      key={activities[index].activity_id}
                      to={`/actividad/${activities[index].activity_id}`}
                    >
                      <p className="enlace">Ver detalle de la actividad</p>
                    </Link>
                    <p
                      className="enlace"
                      onClick={() => confirmDelete(reserva.reservation_id)}
                    >
                      Eliminar reserva
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "100px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{ width: "50%", backgroundColor: "#e5e5e5", padding: "50px" }}
      >
        <h2 style={{ padding: "0px 0px 30px 0px" }}>Perfil del usuario</h2>
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {user.phone}
        </p>
        <p>
          <strong>Fecha de registro:</strong> {user.registration_date}
        </p>
        <p>
          <strong>Reservas:</strong>
        </p>
        {inforeservations()}
        <button onClick={handleLogout} style={{ marginTop: "3rem" }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
export default Profile;
