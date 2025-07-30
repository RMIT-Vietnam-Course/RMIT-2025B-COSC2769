import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

export default function CounterState() {
    const [number, setNumber] = useState(0);
    const [inputValue, setInputValue] = useState(0);

    const handleCopy = () => {
        const parsed = parseInt(inputValue);

        if (!isNaN(parsed)) {
            setNumber(parsed);
        }
    };

    return (
        <div>
            <div className='mb-3'>--- E4-1 ---</div>
            <h4>State Counter</h4>

            <div className='row mt-3'>
                <div className="col-6 input-group mb-3">
                    <button className='btn btn-success' onClick={() => setNumber(number - 1)}>
                        -
                    </button>

                    <input type="number"
                        className="form-control text-center"
                        value={number}
                        readOnly
                    />

                    <button className='btn btn-success' onClick={() => setNumber(number + 1)}>
                        +
                    </button>
                </div>

                <div className="col-6 input-group mb-3">
                    <input type="number"
                        placeholder="Enter a number..."
                        className='form-control text-center'
                        onChange={e => setInputValue(e.target.value)}
                    />

                    <button className='btn btn-success' onClick={handleCopy}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}
