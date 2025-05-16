import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {fetchUsers} from '../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile';

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
        const users= await fetchUsers();
        console.log('Usuarios', users);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            console.log('Usuario:', user)
            login(user);
            navigate(from, { replace: true });
        } else {
            setError('Credenciales incorrectas');
        }
    }
    catch(err){
        setError('Error al obtener usuario');
    }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">Entrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;