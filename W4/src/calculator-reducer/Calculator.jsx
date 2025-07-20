import { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CalcButton from './CalcButton';
import { buttons } from './data';
import { calculatorReducer, initialState } from './calculatorReducer';

export default function Calculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    const handleClick = (label) => {
        if ('0123456789'.includes(label)) {
            dispatch({ type: 'digit', digit: label });
        } else if ('+-x/'.includes(label)) {
            dispatch({ type: 'operator', operator: label });
        } else if (label === '=') {
            dispatch({ type: 'equal' });
        } else if (label === 'C') {
            dispatch({ type: 'clear' });
        }
    };

    const buttonRows = buttons.map(row => (
        <div className='row g-1' key={row[0].label}>
            {row.map(btn => (
                <CalcButton
                    key={btn.label}
                    label={btn.label}
                    color={btn.color}
                    col={btn.col}
                    onClick={() => handleClick(btn.label)}
                />
            ))}
        </div>
    ));

    return (
        <div className='border border-success rounded bg-light p-2 m-3'>
            <input
                type='text'
                value={state.currentValue}
                readOnly
                className='form-control text-end p-2 mb-3 border-success'
            />
            <div className='d-grid gap-1'>
                {buttonRows}
            </div>
        </div>
    );
}
