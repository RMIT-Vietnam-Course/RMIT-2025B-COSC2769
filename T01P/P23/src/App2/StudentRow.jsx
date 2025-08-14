export default function StudentRow({ student }) {
    return (
        <tr>
            <td className="text-center">{student.id}</td>
            <td>{student.name}</td>
            <td className="text-end">{student.GPA}</td>
            <td className="text-center">{student.grade}</td>
        </tr>
    );
}