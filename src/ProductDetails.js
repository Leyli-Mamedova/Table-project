import useFetch from "./useFetch";

const ProductDetails = ({ id, onClose }) => {
    const { data: product, error, isPending } = useFetch('https://dummyjson.com/products/' + id);

    return (
        <div className="details">
            {isPending && <div className="loading">Loading...</div>}
            {error && <div>{error}</div>}
            {product && (
                <div className="transparent">
                    {product.images.map((image, index) => (
                        <div className="image" key={index}>
                            <img src={image} alt={`Product title: ${product.title}`} />
                        </div>
                    ))}
                    <button onClick={onClose} id="exit">X</button>
                    <div className="text">
                        <h2 className="title">{product.title}</h2>
                        <p className="desc">{product.description}</p>
                        <div className="price-brand">
                            {product.brand && (
                                <p className="brand">Brand: {product.brand}</p>
                            )}
                            <p className="price">Price: {product.price}$</p>
                        </div>
                        <div className="info">
                            <div className="info-left">
                                <p className="category"><span>Category: </span>{product.category}</p>
                                <p className="discount">Discount: {product.discountPercentage}%</p>
                            </div>
                            <div className="info-right">
                                <p className="rating">Rating: {product.rating}⭐</p>
                                <div className="tags">{product.tags.map((tag, index) => (
                                    <p key={index}>#{tag}</p>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;