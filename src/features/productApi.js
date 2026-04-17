import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_URL

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/products`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            return data.products;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const searchProducts = createAsyncThunk(
    "products/searchProducts",
    async (query, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/products/search?q=${query}`);
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            return data.products;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (product, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/products/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            if (!res.ok) throw new Error("Create failed");
            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");
            return id;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);