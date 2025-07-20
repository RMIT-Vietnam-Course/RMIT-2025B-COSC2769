import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import CalcButton from './CalcButton';
import { buttons } from './data';

export default function Calculator() {
    const [currentValue, setCurrentValue] = useState('0');
    const [firstNumber, setFirstNumber] = useState(null);
    const [operator, setOperator] = useState(null);

    const handleClick = (label) => {
        if ('0123456789'.includes(label)) handleDigit(label);
        else if ('+-x/'.includes(label)) handleOperator(label);
        else if (label === '=') handleEqual();
        else if (label === 'C') handleClear();
    };

    const handleDigit = (digit) => setCurrentValue(prev => prev === '0' ? digit : prev + digit);
    const handleOperator = (op) => {
        setFirstNumber(Number(currentValue));
        setOperator(op);
        setCurrentValue('0');
    };

    const handleEqual = () => {
        if (firstNumber !== null && operator !== null) {
            const secondNumber = Number(currentValue);
            let result;

            switch (operator) {
                case '+': result = firstNumber + secondNumber; break;
                case '-': result = firstNumber - secondNumber; break;
                case 'x': result = firstNumber * secondNumber; break;
                case '/': result = secondNumber !== 0 ? firstNumber / secondNumber : '#ERR'; break;
                default: result = secondNumber;
            }

            setCurrentValue(String(result));
            setFirstNumber(null);
            setOperator(null);
        }
    };

    const handleClear = () => {
        setCurrentValue('0');
        setFirstNumber(null);
        setOperator(null);
    };

    const buttonRows = buttons.map(row => (
        <div className='row g-1' key={row[0].label}>
            {
                row.map(btn => (
                    <CalcButton
                        key={btn.label}
                        label={btn.label}
                        color={btn.color}
                        col={btn.col}
                        onClick={() => handleClick(btn.label)}
                    />
                ))
            }
        </div>
    ));

    return (
        <div className='border border-success rounded bg-light p-2 m-3'>
            <input
                type='text'
                value={currentValue}
                readOnly
                className='form-control text-end p-2 mb-3 border-success'
            />

            <div className='d-grid gap-1'>
                {buttonRows}
            </div>
        </div>
    );
}