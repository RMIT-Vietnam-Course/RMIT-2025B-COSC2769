import 'bootstrap/dist/css/bootstrap.css';
import { useState, useRef } from 'react';

export default function RefVsStateInput() {
    const [nameState, setNameState] = useState('');
    const nameRef = useRef('');

    console.log('Component rendered.');

    return (
        <div>
            <div className='mb-3'>--- E4-3 ---</div>

            <h4>Using useState</h4>
            <input className='form-control mt-3 mb-2'
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
            />
            <div>Typed (State): {nameState}</div>

            <h4 className='mt-5'>Using useRef</h4>
            <input className='form-control mt-3 mb-2'
                onChange={(e) => nameRef.current = e.target.value}
            />
            <div>Typed (Ref): {nameRef.current}</div>
        </div>
    );
}
