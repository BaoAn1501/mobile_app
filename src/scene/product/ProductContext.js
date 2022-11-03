import React, { useState, createContext } from 'react';
import { getCategoriesForHomePage, getProductsForHomePage, getProductInCategory } from './ProductService';
export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;
    const onGetCategoriesForHomePage = async () => {
        try {
            const res = await getCategoriesForHomePage();
            console.log('getCategoriesForHomePage context: ', res);
            return res;
        } catch (error) {
            console.log('getCategoriesForHomePage error: ', error);
        }
        return [];
    }

    const onGetProductsForHomePage = async () => {
        try {
            const res = await getProductsForHomePage();
            console.log('getProductsForHomePage context: ', res);
            return res;
        } catch (error) {
            console.log('onGetProductForHomePage error: ', error);
        }
        return [];
    }

    const onGetProductsInCategory = async (id) => {
        try {
            const res = await getProductInCategory(id);
            console.log('getProductsInCategory context: ', res);
            return res;
        } catch(error){
            console.log('getProductsInCategory error: ', error);
        }
        return [];
    }

    return (
        <ProductContext.Provider
            value={{
                onGetCategoriesForHomePage, onGetProductsForHomePage,
                onGetProductsInCategory
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};