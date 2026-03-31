import { Link } from 'react-router-dom';

const NavBar = ({ search, setSearch }) => {
    return (
        <div className="navbar">
            <input value={search} type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            <div className='nav-links'>
                <Link onClick={()=> setSearch('')} to="/">Home</Link>
                <Link onClick={()=> setSearch('')} to="/create">Add a new product</Link>
            </div>
        </div>
    );
}

export default NavBar;