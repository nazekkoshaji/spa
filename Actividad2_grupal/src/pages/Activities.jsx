import { useState } from "react";
import { useFilteredActivities } from "../hooks/useFilteredActivities";
import ActivityCard from "../components/ActivityCard";
import "./Activities.css";

const Activities = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { activities, loading, error } = useFilteredActivities(
    search,
    category,
    maxPrice !== "" ? parseFloat(maxPrice) : Infinity
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Actividades Disponibles</h1>
      <div className="filtros">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar actividad..."
          className="busqueda"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="selectorCategoria">
          <option value="">Todas las categorías</option>
          <option value="bienestar">Bienestar</option>
          <option value="gastronomia">Gastronomía</option>
          <option value="arte">Arte</option>
          <option value="aventura">Aventura</option>
          <option value="cultura">Cultura</option>
        </select>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Precio máximo"
          className="precioMax"
        />
      </div>
      {loading && <p>Cargando actividades...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && activities.length === 0 && <p>No se encontraron actividades.</p>}

      <div className="activity">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;
