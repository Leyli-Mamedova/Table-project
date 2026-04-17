import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../features/productsSlice';
import { searchProducts } from '../features/productApi';
import i18n from '../i18n'
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const dispatch = useDispatch()
    const search = useSelector(state => state.products.search)
    const {t} = useTranslation()
    
    const changeLang = () => {
        const current = i18n.language;

        if (current === 'en') {
            i18n.changeLanguage('ru');
            localStorage.setItem('lang', 'ru');
        } else if (current === 'ru') {
            i18n.changeLanguage('az');
            localStorage.setItem('lang', 'az');
        } else {
            i18n.changeLanguage('en');
            localStorage.setItem('lang', 'en');
        }
    }
    return (
        <div className="navbar">
            <input value={search} type="text" placeholder={t('search')} onChange={(e) => {
                const value = e.target.value;
                dispatch(searchProducts(value))
                dispatch(setSearch(value))
            }
            } />
            <div className='nav-links'>
                <Link onClick={() => dispatch(setSearch(''))} to="/">{t('home')}</Link>
                <Link onClick={() => dispatch(setSearch(''))} to="/create">{t('newProduct.name')}</Link>
                <Link onClick={changeLang}><i className="fa-solid fa-language"></i></Link>
            </div>
        </div>
    );
}

export default NavBar;