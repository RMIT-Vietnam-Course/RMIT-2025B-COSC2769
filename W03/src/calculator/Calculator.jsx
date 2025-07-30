import 'bootstrap/dist/css/bootstrap.css';
import CalcButton from './CalcButton';
import { buttons } from './data';

const buttonRows = buttons.map(row => (
    <div className='row g-1' key={row[0].label}>
        {
            row.map(btn => (
                <CalcButton
                    key={btn.label}
                    label={btn.label}
                    color={btn.color}
                    col={btn.col}
                />
            ))
        }
    </div>
));

export default function Calculator() {
    return (
        <div className='border border-success rounded bg-light p-2'>
            <input
                type='number'
                value='0'
                readOnly
                className='form-control text-end px-0 py-2 mb-3 border-success'
            />

            <div className='d-grid gap-1'>
                {buttonRows}
            </div>
        </div>
    );
}
