import { Link } from 'react-router-dom';

const Landing = () => (
    <div style={{
        backgroundImage: 'url("https://images.pexels.com/photos/547116/pexels-photo-547116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70vh',
        color: 'white',
        textAlign: 'center',
        paddingTop: '8rem',
    }}>
        <h1>Outdoor Adventure</h1>
        <p>Descubre experiencias al aire libre y deportivas</p>
        <Link to="/login">
            <button>Reservar ahora</button>
        </Link>
    </div>
);

export default Landing;
