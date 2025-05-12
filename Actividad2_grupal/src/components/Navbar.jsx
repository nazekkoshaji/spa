import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/"><img src={logo} alt="Logo" style={{ height: '100px', marginRight: '1rem' }} /></Link>
            <Link to="/activities">Actividades</Link>
            <Link to="/profile">Perfil</Link>
            {!user && <Link to="/login">Login</Link>}
            {user && (
                <span style={{ marginLeft: 'auto' }}>
          Bienvenid@ {user.name}
        </span>
            )}
        </nav>
    );
};

export default Navbar;
