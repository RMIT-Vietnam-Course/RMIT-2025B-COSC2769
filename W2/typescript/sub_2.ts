interface Product {
    id: number;
    name: string;
    price: number;
    out_of_stock: boolean;
}

const products: Product[] = [
    { id: 1, name: 'Pen', price: 1.5, out_of_stock: false },
    { id: 2, name: 'Notebook', price: 3.2, out_of_stock: true },
    { id: 3, name: 'Pencil', price: 0.5, out_of_stock: false }
];

products[1].out_of_stock = false;
products.push({ id: 4, name: 'Eraser', price: 0.8, out_of_stock: true });

console.log(products);