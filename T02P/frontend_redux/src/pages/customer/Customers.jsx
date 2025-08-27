import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomers } from '../../redux/customersSlice.js';

export default function Customers() {
    const dispatch = useDispatch();
    const { customers, status, error } = useSelector(s => s.customersState);

    useEffect(() => {
        if (status === 'idle')
            dispatch(fetchCustomers());
    }, [status, dispatch]);

    return (
        <div className="container">
            <h2>Customer List</h2>

            {status === 'loading' && <div>Loading...</div>}
            {status === 'failed' && <div>Error: {error}</div>}
            {status === 'succeeded' && (
                <ul>
                    {customers.map(c => (
                        <li key={c.id}>
                            <Link to={`/customers/${c.id}`}
                                className={c.favorite ? 'fw-bold' : ''}
                            >
                                {c.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <hr />

            <Outlet />
        </div>
    );
}