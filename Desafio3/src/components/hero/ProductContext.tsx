import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
    id: number;
    title: string;
    tags: string[];
    sku: number;
    sizes: string[];
    description: {
        short: string;
        long: string;
    };
    images: {
        mainImage: string;
        gallery: string[];
    };
    salePrice: number;
    normalPrice: number;
    colors: {
        name: string;
        hex: string;
    }[];
};

interface ProductContextType {
    selectedProductId: string | null;
    setSelectedProductId: (id: string | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    return (
        <ProductContext.Provider value={{ selectedProductId, setSelectedProductId }}>
            {children}
        </ProductContext.Provider>
    );
};
