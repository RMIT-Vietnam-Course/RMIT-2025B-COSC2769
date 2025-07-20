import { useEffect, useState } from 'react';

export default function CountDown() {
    const [count, setCount] = useState(10);

    useEffect(() => {
        if (count <= 0) return;
        setTimeout(() => setCount(count - 1), 1000);
    }, [count]);

    return (
        <div>
            <div className='mb-3'>--- E5-1 ---</div>
            <h2>Countdown: {count}</h2>
        </div>
    );
}