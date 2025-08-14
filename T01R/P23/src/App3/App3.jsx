import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import CartManager from './CartManager';

const productList = [
    { id: 1, name: 'Laptop', price: 1200, quantity: 1 },
    { id: 2, name: 'Mouse', price: 100, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 300, quantity: 1 },
    { id: 4, name: 'Bao Ho', price: 12345, quantity: 1 }
];

export default function App3() {
    const [products, setProducts] = useState(productList);

    const handleDelete = (id) => setProducts(products.filter(p => p.id !== id));

    const handleUpdate = (id, quantity) => {
        if (quantity < 1) return handleDelete(id);

        setProducts(list =>
            list.map(product =>
                product.id === id
                    ? { ...product, quantity: quantity }
                    : product
            )
        );
    };

    return (
        <div className='container mt-4'>
            <h3 className='mb-2'>Cart</h3>

            <CartManager productList={products}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        </div>
    );
}