import React, { useState, createContext } from 'react';
import { getCategoriesForHomePage, 
    getProductsForHomePage, 
    getProductInCategory,
    getOneProduct,
    getOneSizeProduct,
    saveCart, 
    reviews } from './ProductService';
export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;
    const onGetCategoriesForHomePage = async () => {
        try {
            const res = await getCategoriesForHomePage();
            return res;
        } catch (error) {
            console.log('getCategoriesForHomePage error: ', error);
        }
        return [];
    }

    const onGetProductsForHomePage = async () => {
        try {
            const res = await getProductsForHomePage();
            return res;
        } catch (error) {
            console.log('onGetProductForHomePage error: ', error);
        }
        return [];
    }
    // t tan
    const onGetProductsInCategory = async (id) => {
        try {
            const res = await getProductInCategory(id);
            return res;
        } catch(error){
            console.log('getProductsInCategory error: ', error);
        }
        return [];
    }

    const onGetProduct = async (id) => {
        try {
            const res = await getOneProduct(id);
            // const result = res.entries().next().value;
            return res;
        } catch(error) {
            console.log('getOneProduct error: ', error);
        }
        return [];
    }

    const onGetProductSize = async (id, slug) => {
        try {
            const res = await getOneSizeProduct(id, slug);
            return res;
        } catch(error) {
            console.log('get product size error: ', error);
        }
        return [];
    }

    const onSaveCart = async (id, slug, user_id) => {
        try {
            const res = await saveCart(id, slug, user_id);
            return res;
        } catch(error) {
            console.log('get product size error: ', error);
        }
        return false;
    }

    const onReviewAll = async (id) => {
        try {
            const res = await reviews(id);
            return res;
        } catch(error) {
            console.log('get product size error: ', error);
        }
        return false;
    }

    return (
        <ProductContext.Provider
            value={{
                onGetCategoriesForHomePage, 
                onGetProductsForHomePage,
                onGetProductsInCategory, 
                onGetProduct,
                onGetProductSize,
                onSaveCart,
                onReviewAll
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};