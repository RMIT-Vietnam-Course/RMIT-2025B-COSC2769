import './StaticCalculator.css'

export default function StaticCalculator() {
    return (
        <div className="static-calc">
            <input type="number" value="0" readOnly />

            <div>
                <div className='button-row'>
                    <button>+</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                </div>

                <div className='button-row'>
                    <button>-</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                </div>

                <div className='button-row'>
                    <button>x</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </div>

                <div className='button-row'>
                    <button>/</button>
                    <button className='button-2'>0</button>
                    <button>=</button>
                </div>
            </div>
        </div>
    )
}