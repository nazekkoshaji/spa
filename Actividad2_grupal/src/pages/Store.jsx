import { useEffect, useState } from "react";
import "./Store.css";

const Store = () => {
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      try {
          const res = await fetch(`https://mock.apidog.com/m1/873119-854329-default/store`);
          if (!res.ok) throw new Error('Error al cargar la información de la tienda');
          const data = await res.json();
          setStore(data);
        }
      catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  if (loading) return (<div
        style={{ display: "flex", justifyContent: "center", margin: "100px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>);
  return (
    <div className="container">
      <h2 className="title-store" >{store.name}</h2>
      <div className="content">
        <p>{store.additional_info.description}</p>
        <p><strong className="subtitle">Dirección: </strong>{store.address.street} {store.address.number}, {store.address.city}, {store.address.country}, {store.address.postal_code}</p>
        <div className="info">
          <ul className="contacto">
            <p><strong className="subtitle">Contacto:</strong></p>
            <li>{store.contact.phone}</li>
            <li>{store.contact.email}</li>
            <li>{store.contact.website}</li>
          </ul>
          <ul className="horario">
            <p><strong className="subtitle">Horario:</strong></p>
            <li>Lunes-Viernes: {store.hours.monday}</li>
            <li>Sábado: {store.hours.saturday}</li>
            <li>Domingo: {store.hours.sunday}</li>
          </ul>
        </div>
      </div>
    </div>


  );
};

export default Store;
