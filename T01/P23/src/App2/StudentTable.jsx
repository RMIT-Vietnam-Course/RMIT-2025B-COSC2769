import 'bootstrap/dist/css/bootstrap.css'
import StudentRow from './StudentRow';

export default function StudentTable({ students }) {
    const getGrade = (gpa) => {
        if (gpa < 2) return "NN";
        if (gpa < 3) return "OK";
        return "HD";
    };

    const studentRows = students.map(student => {
        student = { ...student, grade: getGrade(student.GPA) };
        return <StudentRow key={student.id} student={student} />;
    });

    return (
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
    );
}