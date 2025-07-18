import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import CourseRow from './CourseRow';

const courseList = [
    { name: 'Full Stack Development', score: 2 },
    { name: 'Algorithms', score: 3 },
    { name: 'Database Applications', score: 4 },
    { name: 'YourRealFirstName', score: 5 }
];

export default function App3() {
    const [courses, setCourses] = useState(courseList);
    const [courseName, setCourseName] = useState('');
    const [courseScore, setCourseScore] = useState('');

    const handleDelete = (name) => setCourses(courses.filter(c => c.name !== name));
    const handleAdd = (e) => {
        e.preventDefault();

        const score = parseInt(courseScore);

        if (!courseName || isNaN(score)) return;

        const newCourse = {
            name: courseName.trim(),
            score: score
        };

        setCourses([...courses, newCourse]);
        setCourseName('');
        setCourseScore('');
    };

    const courseRows = courses.map(c => <CourseRow key={c.name} course={c} onDelete={() => handleDelete(c.name)} />);

    const totalGPA = courses.reduce((total, s) => total + s.score, 0);
    const avgGPA = courses.length ? (totalGPA / courses.length).toFixed(2) : 0;

    return (
        <div className='container mt-4'>
            <h3 className='mb-2'>Learning Results</h3>

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

            <form onSubmit={handleAdd} className='mt-5'>
                <div className='row'>
                    <div className='col'>
                        <input type='text'
                            value={courseName}
                            placeholder="Name"
                            className='form-control'
                            required
                            onChange={e => setCourseName(e.target.value)}
                        />
                    </div>

                    <div className='col'>
                        <input type="number"
                            value={courseScore}
                            placeholder="Score"
                            className='form-control'
                            required
                            onChange={e => setCourseScore(e.target.value)}
                        />
                    </div>
                </div>

                <div className='text-end mt-3'>
                    <button type='submit' className='btn btn-success'>
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}