import { useLoaderData } from 'react-router-dom';

const API = 'http://localhost:3000';

export async function customerLoader({ params }) {
    const res = await fetch(`${API}/customers/${params.customerId}`);

    if (!res.ok)
        throw new Response('Failed to load customer', { status: res.status });

    return res.json();
}

export default function Customer() {
    const customer = useLoaderData();

    return (
        <div>
            <h3>{customer.name}</h3>
            <div>ID: {customer.id}</div>
            <div>Address: {customer.address}</div>

            {customer.orders?.length > 0 && (
                <div className='mt-3'>
                    <div><strong>Orders</strong></div>

                    <ul>
                        {customer.orders.map(o => (
                            <li key={o.product_id}>
                                Product ID: {o.product_id} - Quantity: {o.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}