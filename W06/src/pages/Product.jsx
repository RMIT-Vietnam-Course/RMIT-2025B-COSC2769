import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, saveProduct, getProductById } from '../redux/slices/productsSlice';

export default function Product() {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const product = useSelector((state) => getProductById(state, productID));

    const handleDecreaseQuantity = () => dispatch(decreaseQuantity({ id: product.id }));
    const handleIncreaseQuantity = () => dispatch(increaseQuantity({ id: product.id }));

    return (
        <>
            <h1>Product #{product.id} Details</h1>
            <div>
                <h2>{product.name} - ${product.price}</h2>
                <div>{product.description}</div>
                <div>Weight: {product.weight}</div>

                <div>
                    <button onClick={handleDecreaseQuantity}>-</button>
                    Quantity: {product.quantity}
                    <button onClick={handleIncreaseQuantity}>+</button>
                </div>

                <div>
                    <button onClick={() => dispatch(saveProduct(product))}> Save </button>
                </div>
            </div>
        </>
    )
}