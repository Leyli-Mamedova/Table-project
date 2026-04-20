import { createSlice } from "@reduxjs/toolkit";
import {
    fetchProducts,
    searchProducts,
    createProduct,
    deleteProduct
} from "./productApi"

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        search: '',
        isPending: false,
        error: null,
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isPending = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isPending = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isPending = false
                state.error = action.error.message
            })
            .addCase(searchProducts.pending, (state) => {
                state.isPending = true
                state.error = null
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isPending = false
                state.products = action.payload
                state.page = 0 
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isPending = false
                state.error = action.error.message
            })
            .addCase(createProduct.pending, (state) => {
                state.isPending = true
                state.error = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isPending = false
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isPending = false
                state.error = action.error.message
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isPending = true
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isPending = false
                state.products = state.products.filter(
                    (p) => p.id !== action.payload
                )
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isPending = false
                state.error = action.error.message
            })


    }
})

export const { setSearch } = productsSlice.actions
export default productsSlice.reducer