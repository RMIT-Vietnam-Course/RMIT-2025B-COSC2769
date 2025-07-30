export default function CourseRow({ course, onDelete }) {
    return (
        <tr>
            <td>{course.name}</td>
            <td className="text-center">{course.score}</td>
            <td className="text-center">
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
                </button>
            </td>
        </tr>
    );
}