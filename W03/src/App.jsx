import 'bootstrap/dist/css/bootstrap.css';

import StaticCalculator from './calculator-static/StaticCalculator'
import BootstrapCalculator from './calculator-bootstrap/BootstrapCalculator'
import Calculator from './calculator/Calculator'
import StudentTable from './student/StudentTable'

export default function App() {
    return (
        <div className='container d-grid gap-5 p-5 w-50'>
            <StaticCalculator />
            <BootstrapCalculator />
            <Calculator />
            <StudentTable />
        </div>
    );
}