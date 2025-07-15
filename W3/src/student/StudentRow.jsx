import 'bootstrap/dist/css/bootstrap.css';

export default function StudentRow({ id, name, major, gpa }) {
    return (
        <tr key={id}>
            <td className="text-center">{id}</td>
            <td>{name}</td>
            <td>{major}</td>
            <td className='text-center'>{gpa}</td>
        </tr>
    );
}