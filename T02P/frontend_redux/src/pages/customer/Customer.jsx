import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCustomerById, toggleFavorite } from '../../redux/customersSlice.js';

export default function Customer() {
    const dispatch = useDispatch();

    const { customerId } = useParams();
    const cId = Number(customerId);

    const { customers } = useSelector(s => s.customersState);
    const customer = customers.find(c => c.id === cId);

    useEffect(() => {
        dispatch(fetchCustomerById(cId));
    }, [cId, dispatch]);

    if (!customer) return <div>No customer.</div>;

    return (
        <div>
            <h3>
                {customer.name} | {' '}

                <label>
                    Favorite{' '}
                    <input type="checkbox"
                        checked={customer.favorite}
                        onChange={() => dispatch(toggleFavorite(cId))}
                    />
                </label>
            </h3>

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