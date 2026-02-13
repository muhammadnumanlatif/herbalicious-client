'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { Product, CartItem } from '@/src/types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('herbalicious_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('herbalicious_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => String(item.id) === String(product.id));
            if (existing) {
                return prev.map(item =>
                    String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            // Clean price string to number (e.g., "Rs. 1,200" -> 1200)
            const numericPrice = typeof product.price === 'string'
                ? parseInt(product.price.replace(/[^0-9]/g, '')) || 0
                : product.price;

            return [...prev, {
                ...product,
                numericPrice,
                quantity: 1
            } as CartItem];
        });
    };

    const removeFromCart = (productId: string | number) => {
        setCart(prev => prev.filter(item => String(item.id) !== String(productId)));
    };

    const updateQuantity = (productId: string | number, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item =>
            String(item.id) === String(productId) ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    const subtotal = cart.reduce((sum, item) => sum + (item.numericPrice * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}
