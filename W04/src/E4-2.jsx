import 'bootstrap/dist/css/bootstrap.css';
import { useState, useRef } from 'react';

export default function CounterRef() {
    const [number, setNumber] = useState(0);
    const inputRef = useRef();

    const handleCopy = () => {
        const parsed = parseInt(inputRef.current.value);

        if (!isNaN(parsed)) {
            setNumber(parsed);
        }
    };

    return (
        <div>
            <div className='mb-3'>--- E4-2 ---</div>
            <h4>Ref Counter</h4>

            <div className='row mt-3'>
                <div className="col-6 input-group mb-3">
                    <button className='btn btn-success' onClick={() => setNumber(number - 1)}>
                        -
                    </button>

                    <input type="number" className="form-control text-center" value={number} readOnly />

                    <button className='btn btn-success' onClick={() => setNumber(number + 1)}>
                        +
                    </button>
                </div>

                <div className="col-6 input-group mb-3">
                    <input type="number"
                        placeholder="Enter a number..."
                        className='form-control text-center'
                        ref={inputRef}
                    />

                    <button className='btn btn-success' onClick={handleCopy}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}
