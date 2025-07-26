import 'bootstrap/dist/css/bootstrap.css'
import { useRef, useState } from 'react';
import CourseTable from './CourseTable';

const courseList = [
    { name: 'Full Stack Development', score: 2 },
    { name: 'Algorithms', score: 3 },
    { name: 'Database Applications', score: 4 },
    { name: 'YourRealFirstName', score: 5 }
];

export default function App3() {
    const [courses, setCourses] = useState(courseList);
    const courseNameRef = useRef('');
    const courseScoreRef = useRef('');

    const handleDelete = (name) => setCourses(courses.filter(c => c.name !== name));

    const handleAdd = (e) => {
        e.preventDefault();

        const score = Number(courseScoreRef.current.value);
        const name = courseNameRef.current.value.trim();

        if (!name || isNaN(score)) return;

        const newCourse = { name, score };
        setCourses([...courses, newCourse]);

        courseScoreRef.current.value = '';
        courseNameRef.current.value = '';
    };

    return (
        <div className='container mt-4'>
            <h3 className='mb-2'>Learning Results</h3>

            <CourseTable courseList={courses} onDeleteCourse={handleDelete} />

            <form onSubmit={handleAdd} className='mt-5'>
                <div className='row'>
                    <div className='col'>
                        <input type='text'
                            ref={courseNameRef}
                            placeholder="Name"
                            className='form-control'
                            required
                        />
                    </div>

                    <div className='col'>
                        <input type="number"
                            ref={courseScoreRef}
                            placeholder="Score"
                            className='form-control'
                            required
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