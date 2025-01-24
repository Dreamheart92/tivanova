'use client';

import {createContext, useContext, useState} from "react";

import {ProductVariantType} from "@/lib/definitions/product";

type ProductContextState = {
    selectedOption: ProductVariantType | null,
    onSelectOption: (option: ProductVariantType | undefined) => void,
}

const ProductContext = createContext<ProductContextState | null>(null);

export default function ProductProvider({children}: { children: React.ReactNode }) {
    const [selectedOption, setSelectedOption] = useState<ProductVariantType | null>(null);

    const handleSelectOption = (option: ProductVariantType | undefined) => {
        if (option) {
            setSelectedOption(option);
        }
    }

    const productContextValue = {
        selectedOption,
        onSelectOption: handleSelectOption,
    };

    return (
        <ProductContext.Provider value={productContextValue}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct() {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('use useProduct inside a ProductProvider');
    }

    return context;
}