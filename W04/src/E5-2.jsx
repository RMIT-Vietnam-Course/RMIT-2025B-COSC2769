import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

export default function EffectExample() {
    const [number, setNumber] = useState(0);
    const [text, setText] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 1500);
    }, [number, text]);

    return (
        <div>
            <div className='mb-3'>--- E5-2 ---</div>
            <h4 className='mb-3'>Another example of useEffect</h4>

            <div className='alert alert-success mb-3'>
                {showMessage && <span>You changed something.</span>}
            </div>

            <div className='btn-group mb-3'>
                <button className='btn btn-outline-success'
                    onClick={() => setNumber(number + 1)}
                >
                    Change Number
                </button>

                <button className='btn btn-outline-success'
                    onClick={() => setText(text + 1)}
                >
                    Change Text
                </button>
            </div>
        </div>
    );
}
