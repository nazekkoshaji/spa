import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return <p>No hay usuario autenticado.</p>;

    const handleLogout = () => {
        logout();
        navigate('/'); // te redirige al inicio
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h2>Perfil del usuario</h2>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
                Cerrar sesión
            </button>
        </div>
    );
};

export default Profile;
