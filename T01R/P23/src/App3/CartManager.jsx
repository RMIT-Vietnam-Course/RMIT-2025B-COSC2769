export default function CartManager({ productList, onDelete, onUpdate }) {
    const productRows = productList.map(p => (
        <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td className="input-group">
                <button className="btn btn-success" onClick={() => onUpdate(p.id, p.quantity - 1)}>
                    -
                </button>

                <input type="number" className="form-control"
                    value={p.quantity}
                    onChange={(e) => onUpdate(p.id, Number(e.target.value))}
                />

                <button className="btn btn-success" onClick={() => onUpdate(p.id, p.quantity + 1)}>
                    +
                </button>
            </td>
            <td>{p.price * p.quantity}</td>

            <td className="text-center">
                <button className='btn btn-danger' onClick={() => onDelete(p.id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    const totalAmount = productList.reduce((total, p) => total + (p.quantity * p.price), 0);

    return (
        <>
            <table className='table table-bordered'>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productRows}
                </tbody>
            </table>

            <p><strong>Total Amount:</strong> {totalAmount}</p>
        </>
    );
}