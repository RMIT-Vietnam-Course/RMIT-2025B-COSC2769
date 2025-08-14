import Row from './Row';

export default function HackathonResult({ results }) {
    const getStatus = (hour) => {
        if (hour < 30) return "Low";
        if (hour < 45) return "Medium";
        return "High";
    };

    const getColor = (status) => {
        if (status == "Low") return "table-danger";
        if (status == "Medium") return "table-warning";
        return "table-success";
    };

    const rows = results.map(result => {
        result = { ...result, status: getStatus(result.hours) };
        return <Row key={result.id} data={result} color={getColor(result.status)} />;
    });

    return (
        <table className='table table-bordered'>
            <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>Team</th>
                    <th>Department</th>
                    <th>Hours</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    );
}