import 'bootstrap/dist/css/bootstrap.css'
import CourseRow from './CourseRow';

export default function CourseTable({ courseList, onDeleteCourse }) {
    const courseRows = courseList.map(c => (
        <CourseRow key={c.name} course={c} onDelete={() => onDeleteCourse(c.name)} />
    ));

    const totalGPA = courseList.reduce((total, s) => total + s.score, 0);
    const avgGPA = courseList.length ? (totalGPA / courseList.length).toFixed(2) : 0;

    return (
        <>
            <table className='table table-bordered'>
                <thead>
                    <tr className='text-center'>
                        <th>Course Name</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {courseRows}
                </tbody>
            </table>

            <p><strong>Average Score:</strong> {avgGPA}</p>
        </>
    );
}