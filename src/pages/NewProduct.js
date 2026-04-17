import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/productApi";
import { useTranslation } from 'react-i18next';

const NewProduct = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [discount, setDiscount] = useState("")
    const [rating, setRating] = useState("")
    const [tags, setTags] = useState("")
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const schema = yup.object({

        image: yup.string().url(t('validation.url')).required(t('validation.required')),
        title: yup.string().required(t('validation.required')),
        description: yup.string().required(t('validation.required')),
        price: yup.number().typeError(t('validation.number')).positive(t('validation.positive')).required(t('validation.required')),
        category: yup.string().required(t('validation.required')),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            await schema.validate(
                { image, title, description, price, category },
                { abortEarly: false }
            );

            setErrors({});
        } catch (validationError) {
            const errs = {};

            validationError.inner?.forEach(err => {
                errs[err.path] = err.message;
            });

            setErrors(errs);
            return;
        }

        const product = { title, description, price, brand, category, discount, rating, tags, images: [image] };

        setIsPending(true);

        dispatch(createProduct(product))
            .unwrap()
            .then(() => navigate("/"))
            .catch(console.log);
    };

    return (
        <div className="new">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="full">{t('newProduct.name')}</h2>

                <div className="field">
                    <label>{t('newProduct.image')} <span className="required">*</span></label>
                    <input value={image}
                        onFocus={() =>
                            setErrors((prev) => ({ ...prev, image: "" }))
                        }
                        onChange={(e) => setImage(e.target.value.trim())} />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>

                <div className="field">
                    <label>{t('newProduct.title')}  <span className="required">*</span></label>
                    <input value={title}
                        onFocus={() =>
                            setErrors((prev) => ({ ...prev, title: "" }))
                        }
                        onChange={(e) => setTitle(e.target.value.trim())} />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div className="field full">
                    <label>{t('newProduct.description')}  <span className="required">*</span></label>
                    <textarea value={description}
                        onFocus={() =>
                            setErrors((prev) => ({ ...prev, description: "" }))
                        }
                        onChange={(e) => setDescription(e.target.value.trim())} />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="field">
                    <label>{t('newProduct.price')}  <span className="required">*</span></label>
                    <input type="number" value={price}
                        onFocus={() =>
                            setErrors((prev) => ({ ...prev, price: "" }))
                        }
                        onChange={(e) => setPrice(e.target.value)} />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div className="field">
                    <label>{t('newProduct.brand')} </label>
                    <input value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>

                <div className="field">
                    <label>{t('newProduct.category')}  <span className="required">*</span></label>
                    <input value={category}
                        onFocus={() =>
                            setErrors((prev) => ({ ...prev, category: "" }))
                        }
                        onChange={(e) => setCategory(e.target.value)} />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>

                <div className="field">
                    <label>{t('newProduct.discount')} </label>
                    <input value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>

                <div className="field">
                    <label>{t('newProduct.rating')} </label>
                    <input value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                <div className="field">
                    <label>{t('newProduct.tags')} </label>
                    <input value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>

                {!isPending && <button>{t('newProduct.create')} </button>}
                {isPending && <button disabled>{t('newProduct.loading')} </button>}
            </form>
        </div>
    );
}

export default NewProduct;