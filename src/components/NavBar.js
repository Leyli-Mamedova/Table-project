import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../features/productsSlice';

const NavBar = () => {
  const dispatch = useDispatch()
    const search = useSelector(state=> state.products.search)
    return (
        <div className="navbar">
            <input value={search} type="text" placeholder="Search..." onChange={(e) => dispatch(setSearch(e.target.value))} />
            <div className='nav-links'>
                <Link onClick={()=> dispatch(setSearch(''))} to="/">Home</Link>
                <Link onClick={()=> dispatch(setSearch(''))} to="/create">Add a new product</Link>
            </div>
        </div>
    );
}

export default NavBar;