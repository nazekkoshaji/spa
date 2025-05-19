import { useParams } from "react-router-dom";
import { createReservation } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import useReservas from "../hooks/useReservas";
import "./Reserve.css";

const Reserve = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { activity, loading } = useReservas(id);
  const [formData, setFormData] = useState({
    number_of_people: 1,
    selected_date: "",
    reservation_comments: "",
  });

  const postReserve = async (data) => {
    const reserva = {
      reservation: {
        reservation_id: Math.floor(Math.random() * (100 - 31 + 1)) + 31,
        user_id: user.user_id,
        activity_id: Number(id),
        number_of_people: data.number_of_people,
        selected_date: data.selected_date,
        reservation_comments: data.reservation_comments,
      },
    };
    await createReservation(reserva);
    console.log(reserva);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postReserve(formData);
      alert("Reserva realizada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al realizar la reserva");
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
    <div className="container">
      <div className="content">
      <h2>Realizar reserva</h2>
      <p className="nom_actividad"><strong>{activity[0].name}</strong></p>
      <form className="formulario" onSubmit={handleSubmit}>
        {" "}
        <label>
          Fecha:{" "}
          <select
            className="int_info"
            name="fecha"
            value={formData.selected_date}
            onChange={(e) =>
              setFormData({ ...formData, selected_date: e.target.value })
            }
          >
            {activity[0].available_dates.map((element)=>(
              <option key={element} value={element}>{new Date(element).toLocaleDateString()}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Número de personas:{" "}
          <input
          className="int_info"
            type="number"
            name="number_of_people"
            min="1"
            max={activity[0].limit}
            value={formData.number_of_people}
            onChange={(e) =>
              setFormData({ ...formData, number_of_people: e.target.value })
            }
            required
          />
        </label>
        <br />
        <label>
          Deja un comentario:
          <br />
          <input
            className="input_texto int_info"
            type="text"
            name="reservation_comments"
            placeholder="Comentario"
            value={formData.reservation_comments}
            onChange={(e) =>
              setFormData({ ...formData, reservation_comments: e.target.value })
            }
          />
        </label>
        <br />
        <button className="boton" type="submit">Reservar</button>
      </form>
      </div>
    </div>
  );
};

export default Reserve;
