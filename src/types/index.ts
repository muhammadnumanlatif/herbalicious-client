export interface Product {
    id: string | number;
    name: string;
    slug?: string;
    image: string;
    price: string;
    numericPrice: number;
    category: string;
    shortDescription?: string;
    description?: string;
    attributes?: Record<string, string>;
}

export interface CartItem extends Product {
    quantity: number;
}
