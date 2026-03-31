import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ setProducts }) => {
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
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

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
                } else{
                    console.log(res.ok);
                    
                }
                return res.json()
            })
            .then((newProduct) => {
                console.log(newProduct);
                setIsPending(false);
                setProducts((prev) => [...prev, newProduct]);
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
                    <input
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value.trim())} />
                </div>
                <div className="field">
                    <label>Title</label>
                    <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value.trim())} />
                </div>

                <div className="field full">
                    <label>Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value.trim())} />
                </div>

                <div className="field">
                    <label>Price</label>
                    <input type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="field">
                    <label>Brand</label>
                    <input value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>

                <div className="field">
                    <label>Category</label>
                    <input
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} />
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