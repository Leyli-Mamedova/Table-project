import useFetch from "../useFetch";
import { useTranslation } from 'react-i18next';

const ProductDetails = ({ id, onClose }) => {
    const { data: product, error, isPending } = useFetch('https://dummyjson.com/products/' + id);
    const {t} = useTranslation()

    return (
        <div className="details">
            {isPending && <div className="loading">{t('table.loading')}</div>}
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
                                <p className="brand">{t('productDetails.brand')} {product.brand}</p>
                            )}
                            <p className="price">{t('productDetails.price')} {product.price}$</p>
                        </div>
                        <div className="info">
                            <div className="info-left">
                                <p className="category"><span>{t('productDetails.category')} </span>{product.category}</p>
                                <p className="discount">{t('productDetails.discount')}  {product.discountPercentage}%</p>
                                <p className="weight">{t('productDetails.weight')}  {product.weight}%</p>
                            </div>
                            <div className="info-right">
                                <p className="rating">{t('productDetails.rating')} {product.rating}⭐</p>
                                <div className="tags">{product.tags.map((tag, index) => (
                                    <p key={index}>#{tag}</p>
                                ))}</div>
                                <p className="minimumOrderQuantity">{t('productDetails.quantity')} {product.minimumOrderQuantity}</p>
                            </div>

                            <div className="info-end">
                                <p className="warrantyInformation">{t('productDetails.warranty')} <span>{product.warrantyInformation}</span></p>
                                <p className="shippingInformation">{t('productDetails.shipping')} {product.shippingInformation}</p>
                                <p className="availabilityStatus">{t('productDetails.status')} {product.availabilityStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;