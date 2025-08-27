import { Link, Outlet, useLoaderData } from 'react-router-dom';

const API = 'http://localhost:3000';

export async function customersLoader() {
    const res = await fetch(`${API}/customers`);

    if (!res.ok)
        throw new Response('Failed to load customers', { status: res.status });

    return res.json();
}

export default function Customers() {
    const customers = useLoaderData();

    return (
        <div className="container">
            <h2>Customer List</h2>

            <ul>
                {customers.map(c => (
                    <li key={c.id}>
                        <Link to={`/customers/${c.id}`}>
                            {c.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <hr />

            <Outlet />
        </div>
    );
}