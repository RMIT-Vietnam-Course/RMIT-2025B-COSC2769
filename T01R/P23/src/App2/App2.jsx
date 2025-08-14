import 'bootstrap/dist/css/bootstrap.css'
import HackathonResult from './HackathonResult';

const results = [
    { id: 1, team: 'Alpha', department: 'CS', hours: 38 },
    { id: 2, team: 'Beta', department: 'SE', hours: 22 },
    { id: 3, team: 'Gamma', department: 'AI', hours: 47 },
    { id: 4, team: 'Bao Ho', department: 'IT', hours: 31 }
];

export default function App2() {
    return (
        <div className='container mt-4'>
            <h3 className='mb-2'>Hackathon Result</h3>

            <HackathonResult results={results} />
        </div>
    );
}