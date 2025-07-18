import 'bootstrap/dist/css/bootstrap.css'
import StudentRow from './StudentRow';

const students = [
    { id: 1, name: 'Alice', GPA: 3.2 },
    { id: 2, name: 'Bob', GPA: 2.4 },
    { id: 3, name: 'Carol', GPA: 1.8 },
    { id: 4, name: 'YourRealFirstName', GPA: 3.9 }
];

function getGrade(gpa) {
    if (gpa < 2) return "NN";
    if (gpa < 3) return "OK";
    return "HD";
}

export default function App2() {
    const studentRows = students.map(student => {
        student = { ...student, grade: getGrade(student.GPA) };
        return <StudentRow key={student.id} student={student} />;
    });

    return (
        <div className='container mt-4'>
            <h3 className='mb-2'>Student Table</h3>

            <table className='table table-bordered'>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>GPA</th>
                        <th>Grade</th>
                    </tr>
                </thead>

                <tbody>
                    {studentRows}
                </tbody>
            </table>
        </div>
    );
}