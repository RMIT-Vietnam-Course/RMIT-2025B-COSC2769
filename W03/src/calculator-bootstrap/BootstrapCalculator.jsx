import 'bootstrap/dist/css/bootstrap.css';

export default function BootstrapCalculator() {
    return (
        <div className='border border-success rounded bg-light p-2'>
            <input
                type='number'
                value='0'
                readOnly
                className='form-control text-end px-0 py-2 mb-3 border-success'
            />

            <div className='d-grid gap-1'>
                <div className='row g-1'>
                    <div className="col-3">
                        <button className='btn btn-warning w-100'>+</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>7</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>8</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>9</button>
                    </div>
                </div>

                <div className='row g-1'>
                    <div className="col-3">
                        <button className='btn btn-warning w-100'>-</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>4</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>5</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>6</button>
                    </div>
                </div>

                <div className='row g-1'>
                    <div className="col-3">
                        <button className='btn btn-warning w-100'>x</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>1</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>2</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-success w-100'>3</button>
                    </div>
                </div>

                <div className='row g-1'>
                    <div className="col-3">
                        <button className='btn btn-warning w-100'>/</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-success w-100'>0</button>
                    </div>
                    <div className="col-3">
                        <button className='btn btn-secondary w-100'>=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}