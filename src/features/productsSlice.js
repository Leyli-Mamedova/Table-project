import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        return data.products
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        search: '',
        isPending: false,
        error: null
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action) => {
           state.products = state.products.filter((product) => product.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isPending = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isPending = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isPending = false
                state.error = action.error.message
            })
    }
})

export const { setSearch, addProduct, removeProduct } = productsSlice.actions
export default productsSlice.reducer