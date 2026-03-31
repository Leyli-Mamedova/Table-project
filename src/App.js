import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import { useState } from 'react';
import NewProduct from './NewProduct';
import useFetch from "./useFetch";
import { useEffect } from 'react';
import ColumnGroupingTable from './Table'

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('')
  const { data, isPending, error } = useFetch('https://dummyjson.com/products');

  useEffect(() => {
    if (data) {
      setProducts(data.products)
    }
  }, [data])

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar search={search} setSearch={setSearch} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home isPending={isPending} error={error} products={products} setProducts={setProducts} search={search} />} />
            <Route path="/create" element={<NewProduct setProducts={setProducts} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/table" element={<ColumnGroupingTable/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
