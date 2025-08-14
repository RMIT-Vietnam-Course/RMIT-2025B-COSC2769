import 'bootstrap/dist/css/bootstrap.css'
import StudentTable from './StudentTable';

const students = [
    { id: 1, name: 'Alice', GPA: 3.2 },
    { id: 2, name: 'Bob', GPA: 2.4 },
    { id: 3, name: 'Carol', GPA: 1.8 },
    { id: 4, name: 'YourRealFirstName', GPA: 3.9 }
];

export default function App2() {
    return (
        <div className='container mt-4'>
            <h3 className='mb-2'>Student Table</h3>

            <StudentTable students={students} />
        </div>
    );
}