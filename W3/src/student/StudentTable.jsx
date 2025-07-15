import 'bootstrap/dist/css/bootstrap.css';
import StudentRow from './StudentRow';
import { students } from './data.js';

export default function StudentTable() {
    return (
        <table className='table table-bordered border-success'>
            <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Major</th>
                    <th>GPA</th>
                </tr>
            </thead>

            <tbody>
                {students.map(s => <StudentRow key={s.id} {...s} />)}
            </tbody>
        </table>
    );
}
