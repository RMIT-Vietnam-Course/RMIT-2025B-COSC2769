export default function CalcButton({ label, color, col }) {
    return (
        <div className={`col-${col}`}>
            <button className={`btn btn-${color} w-100`}>{label}</button>
        </div>
    );
}
