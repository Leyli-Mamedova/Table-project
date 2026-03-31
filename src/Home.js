import { useState } from "react";
import ProductDetails from "./ProductDetails";

const Home = ({isPending, error, search, products, setProducts }) => {
    const [selectedId, setSelectedId] = useState(null);
    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id))
    }

    const filtered = products.filter((prod) => prod.category?.toLowerCase().trim().includes(search.toLowerCase().trim()) || prod.title?.toLowerCase().trim().includes(search.toLowerCase().trim()))

    return (
        <div>
            {error && <div>{error}</div>}
            {isPending && <div className="loading">Loading...</div>}
            {filtered.length > 0 && (
                <div className="table-wrapper">
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th className="delete-btn"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(product => (
                                    < tr key={product.id} >
                                        <td className="image-div">
                                            <img src={product.images?.[0]} onClick={() => setSelectedId(product.id)} className="product-image" alt={`Image of ${product.name}`} />
                                        </td>
                                        <td className="product-title" onClick={() => setSelectedId(product.id)}>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price}</td>
                                        <td className="delete-btn">
                                            <i onClick={() => handleDelete(product.id)} className="fa-solid fa-trash-can"></i>
                                        </td>
                                    </tr>
                                ))
                                }    
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            }

            {filtered.length === 0 && !isPending && <div>No products found</div>}
            {selectedId && <ProductDetails id={selectedId} onClose={() => setSelectedId(null)} />}
        </div >
    );
};

export default Home;