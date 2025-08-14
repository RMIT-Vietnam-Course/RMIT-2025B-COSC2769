export default function Row({ data, color }) {
    return (
        <tr className={color}>
            <td className="text-center">{data.id}</td>
            <td className="text-center">{data.team}</td>
            <td className="text-center">{data.department}</td>
            <td className="text-center">{data.hours}</td>
            <td className="text-center">{data.status}</td>
        </tr>
    );
}