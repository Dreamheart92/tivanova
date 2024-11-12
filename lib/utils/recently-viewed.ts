'use client';

import {Product} from "@/lib/definitions";

export const addProductToRecentlyViewed = (product: Product) => {
    const localStorageProducts = localStorage.getItem('recently_viewed');

    if (localStorageProducts) {
        const parsedProducts = JSON.parse(localStorageProducts);

        const isProductViewed = parsedProducts.some((currentProduct: Product) => currentProduct.id === product.id);

        if (!isProductViewed) {
            parsedProducts.unshift(product);
            localStorage.setItem('recently_viewed', JSON.stringify(parsedProducts));
        }
    } else {
        localStorage.setItem('recently_viewed', JSON.stringify([product]));
    }
}

export const getRecentlyViewedProducts = (currentViewedProductId: string): Product[] => {
    const products = localStorage.getItem('recently_viewed');

    if (products) {
        return JSON.parse(products).filter((currentProduct: Product) => currentProduct.id !== currentViewedProductId).slice(0, 4);
    }

    return [];
}