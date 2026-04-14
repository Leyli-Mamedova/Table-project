import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addProduct } from "../features/productsSlice";
import { useSelector, useDispatch } from "react-redux";

const schema = yup.object({
    image:       yup.string().url("Enter a valid URL").required("Required field"),
    title:       yup.string().required("Required field"),
    description: yup.string().required("Required field"),
    price:       yup.number().typeError("Enter a number").positive("Price must be positive").required("Required field"),
    category:    yup.string().required("Required field"),
});

const NewProduct = () => {
    const dispatch = useDispatch()

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await schema.validate({ image, title, description, price, category }, { abortEarly: false });
        } catch (validationError) {
            const errs = {};
            validationError.inner.forEach(err => {
                errs[err.path] = err.message;
            });
            setErrors(errs);
            return;
        }

        setErrors({});
        const product = { title, description, price, brand, category, discount, rating, tags, images: [image] };
        setIsPending(true);

        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(product)
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('cannot fetch the data')
                }
                return res.json()
            })
            .then((newProduct) => {
                console.log(newProduct);
                setIsPending(false);
                dispatch(addProduct(newProduct));
                navigate("/")
            })
            .catch((err) => {
                setIsPending(false)
                console.log(err.message);
            })
    }

    return (
        <div className="new">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="full">Add New Product</h2>

                <div className="field">
                    <label>Image URL</label>
                    <input value={image} onChange={(e) => setImage(e.target.value.trim())} />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>

                <div className="field">
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value.trim())} />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div className="field full">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value.trim())} />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="field">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div className="field">
                    <label>Brand</label>
                    <input value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>

                <div className="field">
                    <label>Category</label>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>

                <div className="field">
                    <label>Discount</label>
                    <input value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>

                <div className="field">
                    <label>Rating</label>
                    <input value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                <div className="field">
                    <label>Tags</label>
                    <input value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>

                {!isPending && <button>Create Product</button>}
                {isPending && <button disabled>Creating Product...</button>}
            </form>
        </div>
    );
}

export default NewProduct;