import { useState } from 'react';

export default function App() {
  const URL = 'http://localhost:2222/products';
  const [products, setProducts] = useState([]);

  async function handleClick() {
    const res = await fetch(URL, { method: "GET" });
    const json = await res.json();
    setProducts(json);
  }

  const data = products.map(p => {
    return (
      <tr key={p.id}>
        <td className='text-center'>{p.id}</td>
        <td>{p.name}</td>
        <td>{p.description}</td>
        <td className='text-end'>{p.price.toLocaleString()}</td>
        <td className='text-center'>{p.weight}</td>
      </tr>
    );
  });

  return (
    <div className='container py-5'>
      <table className='table table-bordered'>
        <thead className='text-center'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Weight</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && <tr><td colSpan="100%">No product.</td></tr>}
          {products.length > 0 && data}
        </tbody>
      </table>

      <div>
        <button onClick={() => handleClick()} className='btn btn-success'>
          Fetch Data
        </button>
      </div>
    </div>
  )
}